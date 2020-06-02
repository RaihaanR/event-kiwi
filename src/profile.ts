import Database from './database';

export default class Profile {
  static async basicInfo(token: string) {
    return await Database.getUserFromToken(token);
  }

  static async societies(uid: number) {
    let societies = await Database.listSubscriptions(uid);
    return societies ? societies : [];
  }

  static async interests(uid: number) {
    let interests = await Database.listInterests(uid);
    return interests ? interests : [];
  }
}