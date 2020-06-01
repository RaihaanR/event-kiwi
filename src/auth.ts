import pgPromise from 'pg-promise';
import request from 'request-promise';
import crypto from 'crypto';

import Database from './database';

export default class Auth {
  static async deleteToken(token: string) {
    return Database.deleteTokenByValue(token);
  }

  static async loadUser(token: string) {
    let row = await Database.getUserFromToken(token);
    const user = {
      firstname: row.firstname,
      surname: row.surname,
      email: row.email
    };
    return user;
  }

  static async validateBearer(bearer: string) {
    const options = {
      method: 'GET',
      uri: 'https://graph.microsoft.com/v1.0/me',
      auth: {
        'bearer': bearer
      }
    };

    try {
      const body = await request(options);
      const user = JSON.parse(body);
      const external = user.id;

      let row = await Database.getUserFromAuthID(external);
      if (!row) {
        row = await Database.putUser(external, user.givenName, user.surname, user.mail);
      }

      const token = await Auth.generateToken();

      await Database.deleteTokenByUser(row.user_id);
      await Database.putToken(token, row.user_id, bearer);

      const result = {
        status: 1,
        body: {
          token: token,
          profile: {
            firstname: row.firstname,
            surname: row.surname,
            email: row.email
          }
        }
      };
      return result;
    } catch (err) {
      const result = {
        status: 0,
        body: "ERROR"
      };
      return result;
    }
  }

  static async generateToken() {
    let success = false;
    let token = '';

    while (!success) {
      token = Auth.randomToken();
      const row = await Database.checkToken(token);

      if (!row) {
        success = true;
      }
    }

    return token;
  }

  static randomToken() {
    return crypto.randomBytes(32).toString('hex');
  }
}