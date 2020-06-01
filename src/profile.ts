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
}