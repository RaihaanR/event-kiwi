import Database from './database';

export default class Profile {

  static async info(uid: number) {
    return Database.getUserFromUserID(uid);
  }

  static async societies(uid: number) {
    const societies = await Database.listSubscriptions(uid);

    return societies ? societies : [];
  }

  static async interests(uid: number) {
    const interests = await Database.listInterests(uid);

    return interests ? interests : [];
  }
}

