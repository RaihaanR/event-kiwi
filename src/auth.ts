import pgPromise from 'pg-promise';
import request from 'request-promise';

export default class Auth {
  static async validateBearer(bearer: string) {
    const options = {
      method: 'GET',
      uri: 'https://graph.microsoft.com/v1.0/me',
      auth: {
        'bearer': bearer
      }
    };
    request(options).then(body => {
      const user = JSON.parse(body);
      let result = {
        status: 1,
        body: {
          firstname: user.givenName,
          surname: user.surname,
          mail: user.mail
        }
      };
      return result;
    }).catch(err => {
      let result = {
        status: 0,
        body: "ERROR"
      };
      return result;
    });
  }
}