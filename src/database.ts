import pgPromise from 'pg-promise';

const pgp = pgPromise();
const dbOptions = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  ssl: true
};
const db = pgp(dbOptions);

export default class Database {

  private static async select(columns: string[], table: string): Promise<any[]> {
    const values = {
      columns: columns,
      table: table
    };

    return db.any('SELECT ${columns:name} FROM ${table:name}', values);
  }

  static async getAllEventCardDetails(): Promise<any[]> {
    const values = {
      e_columns: ['id', 'event_name', 'start_datetime', 'end_datetime',
                'location', 'society_id', 'event_image_src', 'tags'],
      s_columns: ['society_name', 'society_image_src', 'colour', 'short_name']
    };

    const cards = await db.any('SELECT event.${e_columns:name}, society.${s_columns:name} FROM event INNER JOIN society ON (event.society_id = society.id)', values);

    for (let i = 0; i < cards.length; i++) {
      cards[i]['society'] = {'id': cards[i]['society_id'],
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
      columns: ['id', 'event_name', 'start_datetime', 'end_datetime',
                'location', 'society_id', 'event_image_src', 'tags'],
      society_id: societyId
    };

    const cards = await db.any('SELECT ${columns:name} FROM event WHERE society_id = ${society_id}', values);
    const socDetails = await this.getSocietyDetails(societyId);

    for (let i = 0; i < cards.length; i++) {
      cards[i]['society'] = socDetails;

      delete cards[i]['society_id'];
    }

    return cards;
  }

  static async getEventCardDetailsBySocietyIdExceptCurrent(society: any, eventId: number): Promise<any[]> {
    const values = {
      columns: ['id', 'event_name', 'start_datetime', 'end_datetime',
                'location', 'society_id', 'event_image_src', 'tags'],
      society_id: +society['id'],
      event_id: eventId
    };

    const cards = await db.any('SELECT ${columns:name} FROM event WHERE society_id = ${society_id} AND id <> ${event_id}', values);

    for (let i = 0; i < cards.length; i++) {
      cards[i]['society'] = society;

      delete cards[i]['society_id'];
    }

    return cards;
  }

  static async getSocietyDetails(societyId: number): Promise<any | null> {
    return db.oneOrNone('SELECT * FROM society WHERE id = $1', [societyId]);
  }

  static async getEventDetails(eventId: number): Promise<any | null> {
    const details = await db.oneOrNone('SELECT * FROM event WHERE event.id = $1', [eventId]);
    details['society'] = await Database.getSocietyDetails(+details['society_id']);
    details['same_society_events'] = await Database.getEventCardDetailsBySocietyIdExceptCurrent(details['society'], eventId);

    delete details['society_id'];

    return details;
  }

  static async getFileName(file_key: string): Promise<any> {
    return db.oneOrNone('SELECT * FROM file WHERE bucket_key = $1', file_key);
  }

  static async getFilesBySocietyId(society_id: number): Promise<any> {
    const values = {
      columns: ['display_name', 'bucket_key'],
      society_id: society_id
    };

    return db.any('SELECT ${columns:name} FROM file WHERE society_id = ${society_id}', values);
  }

  static async putFile(file_name: string, bucket_key: string, society_id: number) {
    const values = {
      file_name: file_name,
      bucket_key: bucket_key,
      society_id: society_id
    }
    await db.none('INSERT INTO file (id, display_name, bucket_key, society_id) VALUES (DEFAULT, ${file_name}, ${bucket_key}, ${society_id})', values);
  }
}

