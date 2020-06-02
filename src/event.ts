import Database from './database';

export default class Event {

  static async goingStatus(userId: number, eventId: number) {
    const result = await Database.goingStatus(userId, eventId);

    return result ? result['status'] : 0;
  }

  static async setStatus(userId: number, eventId: number, status: number) {
    return await Database.setStatus(userId, eventId, status);
  }
}

