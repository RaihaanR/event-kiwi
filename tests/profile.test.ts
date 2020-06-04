import { expect } from 'chai';
import sinon from 'sinon';
import Database from '../src/database'
import Profile from '../src/profile'

describe('profile', async () => {
  it('loading user profile from user ID calls database', async () => {
    let database = sinon.mock(Database);
    let profile = sinon.mock(Profile);

    const uid = 1;

    database
      .expects("getUserFromUserID")
      .exactly(1)
      .withExactArgs(uid);

    await Profile.info(uid);

    database.verify();
    profile.verify();

    database.restore();
    profile.restore();
  });

  it('loading non-empty society list converts to an array', async () => {
    let database = sinon.mock(Database);
    let profile = sinon.mock(Profile);

    const uid = 1;

    database
      .expects("listSubscriptions")
      .exactly(1)
      .withExactArgs(uid)
      .returns([{}]);

    const societies = await Profile.societies(uid);

    expect(societies).to.be.an('array').that.is.not.empty;

    database.verify();
    profile.verify();

    database.restore();
    profile.restore();
  });

  it('loading empty society list converts from \'null\' to an array', async () => {
    let database = sinon.mock(Database);
    let profile = sinon.mock(Profile);

    const uid = 1;

    database
      .expects("listSubscriptions")
      .exactly(1)
      .withExactArgs(uid)
      .returns(null);

    const societies = await Profile.societies(uid);

    expect(societies).to.be.an('array').that.is.empty;

    database.verify();
    profile.verify();

    database.restore();
    profile.restore();
  });
});

