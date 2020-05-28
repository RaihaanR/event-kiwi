import pgPromise from 'pg-promise';

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

  static db() {
    return db;
  }

  static async getAllEventCardDetails(): Promise<any[]> {
    const values = {
      e_columns: ['event_id', 'event_name', 'start_datetime', 'end_datetime',
                  'location', 'event_image_src', 'tags'],
    };

    const query = 'SELECT event.${e_columns:name}, society.* FROM event INNER JOIN society ON (event.society_id = society.society_id)';
    const cards = await db.any(query, values);

    for (let i = 0; i < cards.length; i++) {
      cards[i]['society'] = {'society_id': cards[i]['society_id'],
                             'society_name': cards[i]['society_name'],
                             'society_image_src': cards[i]['society_image_src'],
                             'colour': cards[i]['colour'],
                             'short_name': cards[i]['short_name']};

      delete cards[i]['society_id'];
      delete cards[i]['society_name'];
      delete cards[i]['society_image_src'];
      delete cards[i]['colour'];
      delete cards[i]['short_name'];
    }

    return cards;
  }

  static async getEventCardDetailsBySocietyId(societyId: number): Promise<any[]> {
    const values = {
      columns: ['event_id', 'event_name', 'start_datetime', 'end_datetime',
                'location', 'society_id', 'event_image_src', 'tags'],
      society_id: societyId
    };

    const query = 'SELECT ${columns:name} FROM event WHERE society_id = ${society_id}';
    const cards = await db.any(query , values);
    const socDetails = await this.getSocietyDetails(societyId);

    for (let i = 0; i < cards.length; i++) {
      cards[i]['society'] = socDetails;

      delete cards[i]['society_id'];
    }

    return cards;
  }

  static async getEventCardDetailsBySocietyIdExceptCurrent(society: any, eventId: number): Promise<any[]> {
    const values = {
      columns: ['event_id', 'event_name', 'start_datetime', 'end_datetime',
                'location', 'society_id', 'event_image_src', 'tags'],
      society_id: +society['society_id'],
      event_id: eventId
    };

    const query = 'SELECT ${columns:name} FROM event WHERE society_id = ${society_id} AND event_id <> ${event_id}';
    const cards = await db.any(query , values);

    for (let i = 0; i < cards.length; i++) {
      cards[i]['society'] = society;

      delete cards[i]['society_id'];
    }

    return cards;
  }

  static async getSocietyDetails(societyId: number): Promise<any | null> {
    return db.oneOrNone('SELECT * FROM society WHERE society_id = $1', [societyId]);
  }

  static async getEventDetails(eventId: number): Promise<any | null> {
    const details = await db.oneOrNone('SELECT * FROM event WHERE event_id = $1', [eventId]);
    details['society'] = await Database.getSocietyDetails(+details['society_id']);
    details['same_society_events'] = await Database.getEventCardDetailsBySocietyIdExceptCurrent(details['society'], eventId);

    delete details['society_id'];

    return details;
  }

  static async getFileName(fileKey: string): Promise<any | null> {
    return db.oneOrNone('SELECT * FROM file WHERE bucket_key = $1', [fileKey]);
  }

  static async getFilesBySocietyId(societyId: number): Promise<any[]> {
    const values = {
      columns: ['display_name', 'bucket_key'],
      society_id: societyId
    };

    return db.any('SELECT ${columns:name} FROM file WHERE society_id = ${society_id}', values);
  }

  static async getFilesByIDs(ids: number[]): Promise<any> {
    const values = {
      columns: ['display_name', 'bucket_key'],
      ids: ids
    };

    return db.any('SELECT ${columns:name} FROM file WHERE file_id IN (${ids:csv})', values);
  }

  static async putFile(fileName: string, bucketKey: string, societyId: number) {
    const values = {
      file_name: fileName,
      bucket_key: bucketKey,
      society_id: societyId
    }

    return db.none('INSERT INTO file (display_name, bucket_key, society_id) VALUES (${file_name:name}, ${bucket_key:name}, ${society_id})', values);
  }
}

