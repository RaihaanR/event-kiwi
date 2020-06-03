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

  static async searchEvents(query: any): Promise<any[]> {
    const values = {
      terms: query.split(' ').map(t => '%' + t + '%'),
      search_term: query.replace(/\s/g, '|'),
    };
    values['length'] = values['terms'].length;
    const cards = await db.any(eventSQL.searchEvents, values);

    for (let i = 0; i < cards.length; i++) {
      this.mergeSocietyDetails(cards[i]);
    }

    return cards;
  }

  static async searchSocieties(query: any): Promise<any[]> {
    return db.any(societySQL.searchSocieties, {pattern: '%' + query + '%'});
  }

  static async getFileName(bucketKey: string): Promise<any | null> {
    return db.oneOrNone(fileSQL.findFileName, {bucket_key: bucketKey});
  }

  static async getFilesBySociety(societyId: number): Promise<any[]> {
    return db.any(societySQL.findSocietyFiles, {society_id: societyId});
  }

  static async getFilesByEvent(eventId: number): Promise<any[]> {
    return db.any(eventSQL.findEventFiles, {event_id: eventId});
  }

  static async getFilesByIds(fileIds: number[]): Promise<any> {
    return db.any(fileSQL.findFileDetails, {file_ids: fileIds});
  }

  static async putFile(fileName: string, bucketKey: string, societyId: number) {
    const values = {
      file_name: fileName,
      bucket_key: bucketKey,
      society_id: societyId
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
      email: email
    };

    return db.one(authSQL.insertNewUser, values);
  }

  static async updateUser(authId: string, firstName: string, surname: string): Promise<null> {
    const values = {
      auth_id: authId,
      first_name: firstName,
      surname: surname
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
      access_token: bearer
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
    return db.none(profileSQL.insertNewInterest, {user_id: userId, tag: tag});
  }

  static async removeInterest(userId: number, tag: string): Promise<null> {
    return db.none(profileSQL.deleteInterest, {user_id: userId, tag: tag});
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
      status: status
    };

    return db.none(eventSQL.setStatus, values);
  }

  static async setSocietyStatus(userId: number, societyId: number, type: number): Promise<null> {
    const values = {
      user_id: userId,
      society_id: societyId,
      type: type
    };

    return db.none(profileSQL.setSocietyStatus, values);
  }

  static async listEventsSubscribed(userId: number): Promise<any[] | null> {
    return db.manyOrNone(eventSQL.calendarListing, {uid: userId});
  }

  static async getEventPosts(eventId: number, start: number): Promise<any[] | null> {
    const values = {
      eid: eventId,
      start: start
    };

    return db.manyOrNone(eventSQL.postListing, values);
  }

  static async getTestDetails(testId: number): Promise<any | null> {
    return db.oneOrNone("SELECT * FROM tests WHERE test_id = ${tid}", {tid: testId});
  }
}

