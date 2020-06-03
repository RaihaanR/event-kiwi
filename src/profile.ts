import Database from './database';

export default class Profile {

  static async info(userId: number) {
    return Database.getUserFromUserID(userId);
  }

  static async societies(userId: number) {
    const societies = await Database.listSubscriptions(userId);

    return societies ? societies : [];
  }

  static async interests(userId: number) {
    const interests = await Database.listInterests(userId);

    return interests ? interests['tags'] : [];
  }

  static async setSocietyStatus(userId: number, societyId: number, status: number) {
    return await Database.setSocietyStatus(userId, societyId, status);
  }
}

