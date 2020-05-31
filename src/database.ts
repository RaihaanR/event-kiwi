import pgPromise from 'pg-promise';

import { event as eventSQL, society as societySQL, file as fileSQL } from './sql';

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

  static async getAllEventCardDetails(): Promise<any[]> {
    const cards = await db.any(eventSQL.findEventCards);

    for (let i = 0; i < cards.length; i++) {
      this.mergeSocietyDetails(cards[i]);
    }

    return cards;
  }

  static async getEventCardDetailsBySociety(societyId: number): Promise<any[]> {
    const values = {
      condition: pgp.as.format('WHERE society_id = ${society_id}', {society_id: societyId})
    };

    const cards = await db.any(societySQL.findSocietyEventCards, values);
    const socDetails = await this.getSocietyDetails(societyId);

    for (let i = 0; i < cards.length; i++) {
      cards[i]['society'] = socDetails;

      delete cards[i]['society_id'];
    }

    return cards;
  }

  static async getOtherEventCardDetailsBySociety(societyId: number, eventId: number): Promise<any[]> {
    const values = {
      condition: pgp.as.format('WHERE society_id = ${society_id} AND event_id <> ${event_id}',
                               {society_id: societyId, event_id: eventId})
    };

    const cards = await db.any(societySQL.findSocietyEventCards, values);
    const society = await this.getSocietyDetails(societyId);

    for (let i = 0; i < cards.length; i++) {
      cards[i]['society'] = society;

      delete cards[i]['society_id'];
    }

    return cards;
  }

  static async getSocietyDetails(societyId: number): Promise<any | null> {
    return db.oneOrNone(societySQL.findSocietyDetails, {society_id: societyId});
  }

  static async getEventDetails(eventId: number): Promise<any | null> {
    const details = await db.oneOrNone(eventSQL.findEventDetails, {event_id: eventId});
    const sameSocietyEvents = await this.getOtherEventCardDetailsBySociety(details['society_id'], eventId);

    details['same_society_events'] = sameSocietyEvents;

    this.mergeSocietyDetails(details);

    return details;
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
    }

    return db.none(fileSQL.insertNewFile, values);
  }
}

