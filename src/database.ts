import pgPromise from 'pg-promise';

import { event as eventSQL, society as societySQL, file as fileSQL, auth as authSQL, profile as profileSQL } from './sql';

const dbOptions = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  ssl: true
};

const pgp = pgPromise();
const db = pgp(dbOptions);

const escapeRegex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;

export default class Database {

  private static mergeSocietyDetails(details: object): void {
    details['society'] = {'society_id': details['society_id'],
                          'society_name': details['society_name'],
                          'society_image_src': details['society_image_src'],
                          'colour': details['colour'],
                          'short_name': details['short_name']};

    delete details['society_id'];
    delete details['society_name'];
    delete details['society_image_src'];
    delete details['colour'];
    delete details['short_name'];
  }

  private static async getEventCardDetails(societyId: number, condition: string): Promise<any[]> {
    const cards = await db.any(societySQL.findSocietyEventCards, {condition: condition});
    const society = await this.getSocietyDetails(societyId);

    for (let i = 0; i < cards.length; i++) {
      cards[i]['society'] = society;
    }

    return cards;
  }

  static async getAllEventCardDetails(): Promise<any[]> {
    const cards = await db.any(eventSQL.findEventCards);

    for (let i = 0; i < cards.length; i++) {
      this.mergeSocietyDetails(cards[i]);
    }

    return cards;
  }

  static async getRelevantEventCards(userId: number, offset: number): Promise<any[]> {
    const values = {
      user_id: userId,
      offset: offset,
    };

    const cards = await db.any(profileSQL.findRelevantEventsCards, values);

    for (let i = 0; i < cards.length; i++) {
      this.mergeSocietyDetails(cards[i]);
    }

    return cards;
  }

  static getEventCardDetailsBySociety(societyId: number): Promise<any[]> {
    const condition = pgp.as.format('WHERE society_id = ${society_id}', {society_id: societyId});

    return this.getEventCardDetails(societyId, condition);
  }

  static getOtherEventCardDetailsBySociety(societyId: number, eventId: number): Promise<any[]> {
    const condition = pgp.as.format('WHERE society_id = ${society_id} AND event_id <> ${event_id}',
                                    {society_id: societyId, event_id: eventId});

    return this.getEventCardDetails(societyId, condition);
  }

  static async getSocietyDetails(societyId: number): Promise<any | null> {
    return db.oneOrNone(societySQL.findSocietyDetails, {society_id: societyId});
  }

  static async getEventDetails(eventId: number): Promise<any | null> {
    const details = await db.oneOrNone(eventSQL.findEventDetails, {event_id: eventId});
    const events = await this.getOtherEventCardDetailsBySociety(details['society_id'], eventId);

    details['same_society_events'] = events;

    this.mergeSocietyDetails(details);

    return details;
  }

  static async searchEvents(search_options: any): Promise<any[]> {
    const options = {
      general: decodeURIComponent(search_options.general),
      society_name: decodeURIComponent(search_options.society_name),
      tag: decodeURIComponent(search_options.tag),
      start: decodeURIComponent(search_options.start),
      end: decodeURIComponent(search_options.end),
      finished: decodeURIComponent(search_options.finished),
      offset: +decodeURIComponent(search_options.offset),
    };

    if (escapeRegex.test(options.general) || escapeRegex.test(options.society_name) ||
        escapeRegex.test(options.tag)) {
      return [];
    }

    let condition = '';
    let cards = [];

    if (options.general.length > 0) {
      const base_pattern = options.general.replace(/\s/gi, '% ') + '%';
      const prefix_pattern = options.general.replace(/\s/gi, ':*|') + ':*';
      const pattern = ['% ' + base_pattern, base_pattern];
      const search_term = options.general.replace(/\s/gi, '&');

      condition += '"end_datetime" > now() AND (';
      condition += '"event_name" ILIKE ANY(${pattern}) OR ';
      condition += '"society_name" ILIKE ANY(${pattern}) OR ';
      condition += '"short_name" ILIKE ANY(${pattern}) OR ';
      condition += 'to_tsvector(array_to_string("tags", \' \')) @@ to_tsquery(${search_term})';
      condition += ') ORDER BY (';
      condition += 'ts_rank_cd(to_tsvector("event_name"), to_tsquery(${prefix_pattern}), 16) + ';
      condition += 'ts_rank_cd(to_tsvector("society_name"), to_tsquery(${prefix_pattern})) + ';
      condition += 'ts_rank_cd(to_tsvector("short_name"), to_tsquery(${prefix_pattern})) + ';
      condition += 'ts_rank_cd(to_tsvector(array_to_string("tags", \' \')), to_tsquery(${search_term}), 8)';
      condition += ') DESC';

      condition = pgp.as.format(condition, {prefix_pattern: prefix_pattern, pattern: pattern, search_term: search_term});
    } else {
      const values = {};

      if (options.society_name.length > 0) {
        const base_name = options.society_name.replace(/\s/gi, '% ') + '%';
        values['name'] = ['% ' + base_name, base_name];

        condition += '"society_name" ILIKE ANY(${name}) ';
      }

      if (options.tag.length > 0) {
        values['tag'] = options.tag.replace(/\s/gi, '&');

        if (condition.length > 0) {
          condition += 'AND ';
        }

        condition += 'to_tsvector(array_to_string("tags", \' \')) @@ to_tsquery(${tag}) ';
      }

      if (options.start.length > 0) {
        try {
          values['start'] = new Date(options.start).toISOString();

          if (condition.length > 0) {
            condition += 'AND ';
          }

          condition += '"start_datetime" >= ${start} ';
        } catch {
          return [];
        }
      }

      if (options.end.length > 0) {
        try {
          values['end'] = new Date(options.end).toISOString();

          if (condition.length > 0) {
            condition += 'AND ';
          }

          condition += '"end_datetime" <= ${end} ';
        } catch {
          return [];
        }
      }

      if (options.finished.length > 0) {
        const lower = options.finished.toLowerCase();

        if (condition.length > 0) {
          condition += 'AND ';
        }

        if (lower === 'true') {
          condition += '"end_datetime" < now()';
        } else if (lower === 'false') {
          condition += '"end_datetime" > now()';
        } else {
          return [];
        }
      }

      condition = pgp.as.format(condition, values);
    }

    if (condition.length === 0) {
      return [];
    }

    cards = await db.any(eventSQL.searchEvents, {condition: condition, offset: options.offset});

    for (let i = 0; i < cards.length; i++) {
      this.mergeSocietyDetails(cards[i]);
    }

    return cards;
  }

  static async searchSocieties(query: any, userId: number): Promise<any[]> {
    const q = decodeURIComponent(query);

    if (q.length === 0 || escapeRegex.test(q)) {
      return [];
    }

    const values = {
      user_id: userId,
      pattern: '%' + q + '%',
    };

    return db.any(societySQL.searchSocieties, values);
  }

  static async getFileName(bucketKey: string, fileTable: string): Promise<any | null> {
    const values = {
      ft: fileTable,
      bucket_key: bucketKey
    };

    return db.oneOrNone(fileSQL.findFileName, values);
  }

  static async getFilesBySociety(societyId: number): Promise<any[]> {
    return db.any(societySQL.findSocietyFiles, {society_id: societyId});
  }

  static async getFilesByEvent(eventId: number): Promise<any[]> {
    return db.any(eventSQL.findEventFiles, {event_id: eventId});
  }

  static async getFilesByIds(fileIds: number[], fileTable: string): Promise<any> {
    const values = {
      ft: fileTable,
      file_ids: fileIds
    };

    return db.any(fileSQL.findFileDetails, values);
  }

  static async putFile(fileName: string, bucketKey: string, societyId: number, fileTable: string) {
    const values = {
      ft: fileTable,
      file_name: fileName,
      bucket_key: bucketKey,
      society_id: societyId,
    };

    return db.none(fileSQL.insertNewFile, values);
  }

  static async getUserFromAuthID(authId: string): Promise<any | null> {
    return db.oneOrNone(authSQL.findUserByAuthId, {auth_id: authId});
  }

  static async getUserFromUserID(userId: number): Promise<any | null> {
    return db.oneOrNone(authSQL.findUserByUserId, {user_id: userId});
  }

  static async putUser(authId: string, firstName: string, surname: string, email: string): Promise<any> {
    const values = {
      auth_id: authId,
      first_name: firstName,
      surname: surname,
      email: email,
    };

    return db.one(authSQL.insertNewUser, values);
  }

  static async updateUser(authId: string, firstName: string, surname: string): Promise<null> {
    const values = {
      auth_id: authId,
      first_name: firstName,
      surname: surname,
    };

    return db.none(authSQL.updateUser, values);
  }

  static async deleteTokenByUser(userId: number): Promise<null> {
    return db.none(authSQL.deleteTokenByUser, {user_id: userId});
  }

  static async deleteTokenByValue(token: string): Promise<null> {
    return db.none(authSQL.deleteTokenByValue, {token: token});
  }

  static async deleteAllTokensByValue(token: string): Promise<null> {
    return db.none(authSQL.deleteAllTokensByValue, {token: token});
  }

  static async checkToken(token: string): Promise<any | null> {
    return db.oneOrNone(authSQL.checkTokenExists, {token: token});
  }

  static async putToken(token: string, userId: number, bearer: string): Promise<null> {
    const values = {
      token: token,
      user_id: userId,
      access_token: bearer,
    };

    return db.none(authSQL.insertNewToken, values);
  }

  static async getUserFromToken(token: string): Promise<any | null> {
    return db.oneOrNone(authSQL.findUserByToken, {token: token});
  }

  static async listSubscriptions(userId: number): Promise<any[]> {
    return db.any(profileSQL.listSocieties, {user_id: userId});
  }

  static async listInterests(userId: number): Promise<any | null> {
    return db.oneOrNone(profileSQL.listInterests, {user_id: userId});
  }

  static async addInterest(userId: number, tag: string): Promise<null> {
    const t = decodeURIComponent(tag);

    if (t.length === 0 || t.length > 32 || escapeRegex.test(t)) {
      return;
    }

    return db.none(profileSQL.insertNewInterest, {user_id: userId, tag: t});
  }

  static async removeInterest(userId: number, tag: string): Promise<null> {
    const t = decodeURIComponent(tag);

    if (t.length === 0 || t.length > 32 || escapeRegex.test(t)) {
      return;
    }

    return db.none(profileSQL.deleteInterest, {user_id: userId, tag: t});
  }
  
  static async countInterested(userId: number, query: any): Promise<any[]> {
    const q = decodeURIComponent(query);

    if (q.length === 0 || escapeRegex.test(q)) {
      return [];
    }

    const pattern = q.replace(/\s/gi, '% ') + '%';
    const values = {
      pattern: '{"' + pattern + '"' + ', "% ' + pattern + '"}'
    };

    return await db.any(profileSQL.countInterested, values);
  }

  static async goingStatus(userId: number, eventId: number): Promise<any | null> {
    const values = {
      user_id: userId,
      event_id: eventId,
    };

    return db.oneOrNone(eventSQL.goingStatus, values);
  }

  static async setStatus(userId: number, eventId: number, status: number): Promise<null> {
    const values = {
      user_id: userId,
      event_id: eventId,
      status: status,
    };

    return db.none(eventSQL.setStatus, values);
  }

  static async setSocietyStatus(userId: number, societyId: number, type: number): Promise<null> {
    const values = {
      user_id: userId,
      society_id: societyId,
      type: type,
    };

    return db.none(profileSQL.setSocietyStatus, values);
  }

  static async listEventsSubscribed(userId: number): Promise<any[] | null> {
    return db.manyOrNone(eventSQL.calendarListing, {uid: userId});
  }

  static async getEventPosts(eventId: number, start: number): Promise<any[] | null> {
    const values = {
      event_id: eventId,
      start: start,
    };

    return db.manyOrNone(eventSQL.postListing, values);
  }

  static async getTestDetails(testId: number): Promise<any | null> {
    return db.oneOrNone("SELECT * FROM tests WHERE test_id = ${tid}", {tid: testId});
  }

  static async getSocietyFromOwner(userId: number): Promise<any | null> {
    return db.oneOrNone(profileSQL.getSocietyFromOwner, {uid: userId});
  }

  static async checkIfUserCanDelete(bucketKey: string, userId: number): Promise<any | null> {
    const values = {
      bucket_key: bucketKey,
      user_id: userId,
    };

    return db.oneOrNone(fileSQL.checkDeletion, values);
  }

  static async deleteFileEntry(fileId: number) {
    return db.none(fileSQL.deleteFile, {fid: fileId});
  }

  static async canPost(userId: number, eventId: number): Promise<any | null> {
    const values = {
      eid: eventId,
      uid: userId
    }

    return db.oneOrNone(eventSQL.postCreatePermission, values);
  }

  static async createPost(eventId: number, societyId: number, body: string): Promise<any> {
    const values = {
      eid: eventId,
      sid: societyId,
      body: body
    };

    return db.one(eventSQL.postCreate, values);
  }

  static async canDeletePost(userId: number, postId: number): Promise<any | null> {
    const values = {
      uid: userId,
      pid: postId
    };

    return db.oneOrNone(eventSQL.postDeletePermission, values);
  }

  static async deletePost(postId: number): Promise<null> {
    return db.none(eventSQL.postDelete, {pid: postId});
  }

  static async createEvent(societyId: number, name: string, location: string, desc: string, privacy: number, tags: string[], start: Date, end: Date, img: string): Promise<any> {
    const values = {
      name: name,
      start: start,
      end: end,
      location: location,
      desc: desc,
      sid: societyId,
      img: img,
      priv: privacy
    };

    const row = await db.one(eventSQL.createEvent, values);

    const tagValues = {
      eid: row.event_id,
      tags: tags
    }

    await db.none(eventSQL.createEventTags, tagValues);

    return row;
  }

  static async editEvent(eventId: number, name: string, location: string, desc: string, privacy: number, tags: string[], start: Date, end: Date, img: string): Promise<any> {
    const values = {
      eid: eventId,
      name: name,
      start: start,
      end: end,
      location: location,
      desc: desc,
      img: img,
      priv: privacy
    };

    await db.none(eventSQL.editEvent, values);

    const tagValues = {
      eid: eventId,
      tags: tags
    }

    return db.none(eventSQL.editEventTags, tagValues);
  }

  static async getSocietyOwner(societyId: number): Promise<any> {
    return db.one(societySQL.getOwner, {sid: societyId});
  }

  static async eventContainsFile(eventId: number, key: string): Promise<any | null> {
    const values = {
      eid: eventId,
      key: key
    };

    return db.oneOrNone(eventSQL.fileCheck, values);
  }

  static async addFileToEvent(eventId: number, keys: string[]): Promise<null> {
    const values = {
      eid: eventId,
      keys: keys
    };

    return db.none(eventSQL.fileAdd, values);
  }

  static async removeFileFromEvent(eventId: number, keys: string[]): Promise<null> {
    const values = {
      eid: eventId,
      keys: keys
    };

    return db.none(eventSQL.fileRemove, values);
  }

  static async deleteEvent(eventId: number): Promise<null> {
    return db.none(eventSQL.deleteEvent, {eid: eventId});
  }

  static async incrementDownload(key: string): Promise<null> {
    return db.none(fileSQL.incrementDownload, {key: key});
  }
}

