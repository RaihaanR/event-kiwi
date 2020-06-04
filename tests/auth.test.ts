import sinon from 'sinon';
import Database from '../src/database'
import Auth from '../src/auth'

describe('authentication', async () => {
  it('obtaining uidFromBearer calls correct functions (valid token)', async () => {
    let database = sinon.mock(Database);
    let auth = sinon.mock(Auth);

    const token = "123abc";
    const header = "Bearer " + token;

    auth
      .expects("extractBearer")
      .exactly(1)
      .withExactArgs(header)
      .returns(token);

    database
      .expects("getUserFromToken")
      .exactly(1)
      .withExactArgs(token);

    Auth.uidFromBearer(header);

    database.verify();
    auth.verify();

    database.restore();
    auth.restore();
  });

  it('obtaining uidFromBearer calls correct functions (invalid token)', async () => {
    let database = sinon.mock(Database);
    let auth = sinon.mock(Auth);

    const header = "";

    auth
      .expects("extractBearer")
      .exactly(1)
      .withExactArgs(header)
      .returns("");

    database
      .expects("getUserFromToken")
      .exactly(0);

    Auth.uidFromBearer(header);

    database.verify();
    auth.verify();

    database.restore();
    auth.restore();
  });

  it('generates a valid new user from a token', async () => {
    let database = sinon.mock(Database);
    let auth = sinon.mock(Auth);

    const bearer = "eyXXXXX";
    const token = "0000"
    const dummy = {
      id: "00000000-0000-0000-0000-000000000000",
      givenName: "John",
      surname: "Smith",
      mail: "js0000@ic.ac.uk"
    };

    auth
      .expects("generateUser")
      .exactly(1)
      .withExactArgs(bearer)
      .returns(dummy);

    auth
      .expects("generateToken")
      .exactly(1)
      .returns(token);

    database
      .expects("putToken")
      .exactly(1);

    await Auth.validateBearer(bearer);

    database.verify();
    auth.verify();

    database.restore();
    auth.restore();
  });

  it('allows for token deletion', async () => {
    let database = sinon.mock(Database);
    let auth = sinon.mock(Auth);

    const token = "0000"

    database
      .expects("deleteTokenByValue")
      .exactly(1)
      .withExactArgs(token);

    await Auth.deleteToken(token);

    database.verify();
    auth.verify();

    database.restore();
    auth.restore();
  });
});

