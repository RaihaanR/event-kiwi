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

  private static async select(column: string, table: string): Promise<any> {
    return db.any('SELECT $1:name FROM $2:name', [column, table]);
  }

  static async getAllEvents(): Promise<any> {
    return this.select('*', this.event);
  }
}

