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

  private static event: string = 'event';
  private static society: string = 'society';

  private static async select(columns: string[], table: string): Promise<any> {
    const values = {
      columns: columns,
      table: table
    };

    return db.any('SELECT ${columns:name} FROM ${table:name}', values);
  }

  static async getAllEventCardDetails(): Promise<any> {
    return this.select(['id', 'event_name', 'start_datetime', 'end_datetime',
                        'location', 'society_id', 'event_image_src', 'tags'], this.event);
  }

  static async getEventCardDetailsBySocietyId(society_id: number): Promise<any> {
    const values = {
      columns: ['id', 'event_name', 'start_datetime', 'end_datetime',
                'location', 'society_id', 'event_image_src', 'tags'],
      society_id: society_id
    };

    return db.any('SELECT ${columns:name} FROM event WHERE society_id = ${society_id}', values);
  }

  static async getSocietyDetails(society_id: number): Promise<any> {
    return db.oneOrNone('SELECT * FROM society WHERE id = $1', society_id);
  }

  static async getEventDetails(event_id: number): Promise<any> {
    return db.oneOrNone('SELECT * FROM event INNER JOIN society on (event.society_id = society.id) WHERE event.id = $1', [event_id]);
  }
}

