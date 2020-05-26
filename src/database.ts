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

  private static table1: string = 'table1';
  private static table2: string = 'table2';

  private static async select(column: string, table: string): Promise<any> {
    return db.any('SELECT $1:name FROM $2:name', [column, table]);
  }

  private static async join(t1: string, t2: string): Promise<any> {
    return db.any('SELECT * FROM $1:name NATURAL JOIN $2:name', [t1, t2]);
  }

  static async allTable1(): Promise<any[]> {
    return this.select('*', this.table1);
  }

  static async allTable2(): Promise<any[]> {
    return this.select('*', this.table2);
  }

  static async getColTable1(column: string): Promise<any[]> {
    return this.select(column, this.table1);
  }

  static async getColTable2(column: string): Promise<any[]> {
    return this.select(column, this.table2);
  }

  static async joinTable1Table2(): Promise<any[]> {
    return this.join(this.table1, this.table2);
  }
}

