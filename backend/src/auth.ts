import pgPromise from 'pg-promise';
import request from 'request-promise';
import crypto from 'crypto';

import Database from './database';
import Profile from './profile';

export default class Auth {

  static async uidFromBearer(bearer: string) {
    const token = Auth.extractBearer(bearer);

    if (token !== '') {
      const row = await Database.getUserFromToken(token);

      if (row) {
        return row['user_id'];
      }
    }

    return -1;
  }

  static async deleteToken(token: string) {
    return Database.deleteTokenByValue(token);
  }

  static async deleteAllTokens(token: string) {
    return Database.deleteAllTokensByValue(token);
  }

  static async loadUser(token: string) {
    const row = await Database.getUserFromToken(token);

    if (row) {
      const user = {
        firstname: row['firstname'],
        surname: row['surname'],
        email: row['email']
      };

      return user;
    }

    return {};
  }

  static async validateBearer(bearer: string) {
    try {
      const graph = await Auth.generateUser(bearer);
      const society = !(graph.givenName && graph.surname);
      const user = {
        id: graph.id,
        givenName: society ? graph.displayName : graph.givenName,
        surname: society ? "" : graph.surname,
        mail: graph.mail
      };
      const external = user['id'];

      let row = await Database.getUserFromAuthID(external);

      if (!row) {
        row = await Database.putUser(external, user['givenName'], user['surname'], user['mail']);
      } else {
        if (user['givenName'] !== row['firstname'] || user['surname'] !== row['surname']) {
          await Database.updateUser(external, user['givenName'], user['surname']);
        }
      }

      const token = await Auth.generateToken();

      await Database.putToken(token, row['user_id'], bearer);

      const result = {
        status: 1,
        body: {
          token: token,
          profile: {
            firstname: user['givenName'],
            surname: user['surname'],
            email: user['mail'],
            society: String(await Profile.getSocietyFromOwner(row['user_id']))
          }
        }
      };

      return result;
    } catch (err) {
      const result = {
        status: 0,
        body: 'ERROR'
      };

      return result;
    }
  }

  static async generateUser(bearer: string) {
    const options = {
      method: 'GET',
      uri: 'https://graph.microsoft.com/v1.0/me',
      auth: {
        'bearer': bearer
      }
    };
    const body = await request(options);
    return JSON.parse(body);
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

  static extractBearer(header: string) {
    if (header) {
      const parts = header.split(' ');

      if (parts.length === 2) {
        const scheme = parts[0];
        const token = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          return token;
        }
      }
    }

    return '';
  }
}

