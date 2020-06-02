import Database from './database';

export default class Event {
  static async goingStatus(userId: number, eventId: number) {
    const result = await Database.goingStatus(userId, eventId);
    return result ? result.status : 0;
  }
}