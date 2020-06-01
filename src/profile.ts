import Database from './database';
import Auth from './auth';

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
    interests = interests ? interests : [];
    return interests.map(i => i.val);
  }
}