import { expect } from 'chai';
import sinon from 'sinon';
import Database from '../src/database'
import Event from '../src/event'

describe('event', async () => {
  it('loading going status should default to 0', async () => {
    let database = sinon.mock(Database);
    let event = sinon.mock(Event);

    const uid = 1;
    const eid = 1;

    database
      .expects("goingStatus")
      .exactly(1)
      .withExactArgs(uid, eid)
      .returns(null);

    const status = await Event.goingStatus(uid, eid);

    expect(status).equal(0);

    database.verify();
    event.verify();

    database.restore();
    event.restore();
  });

  it('loading going status should give database result if it exists', async () => {
    let database = sinon.mock(Database);
    let event = sinon.mock(Event);

    const uid = 1;
    const eid = 1;

    database
      .expects("goingStatus")
      .exactly(1)
      .withExactArgs(uid, eid)
      .returns({status: 1});

    const status = await Event.goingStatus(uid, eid);

    expect(status).equal(1);

    database.verify();
    event.verify();

    database.restore();
    event.restore();
  });

  it('loading non-empty posts list converts to an array', async () => {
    let database = sinon.mock(Database);
    let event = sinon.mock(Event);

    const eid = 1;
    const start = 1;

    const row = {
      post_id: 0,
      event_id: 0,
      society_id: 0,
      society_name: "foobar",
      short_name: "fb",
      society_image_src: "https://example.com/soc.jpg",
      post_time: "SOME TIMESTAMP",
      body: "hello world!"
    };

    const post = {
      id: row.post_id,
      event: row.event_id,
      organiser: {
        id: row.society_id,
        name: row.society_name,
        short: row.short_name,
        image: row.society_image_src
      },
      time: row.post_time,
      body: row.body
    }

    database
      .expects("getEventPosts")
      .exactly(1)
      .withExactArgs(eid, start)
      .returns([row]);

    const posts = await Event.getPosts(eid, start);

    expect(posts).to.be.an('array').that.is.not.empty.and.to.include(post);

    database.verify();
    event.verify();

    database.restore();
    event.restore();
  });

  it('loading empty posts list converts from \'null\' to an array', async () => {
    let database = sinon.mock(Database);
    let event = sinon.mock(Event);

    const eid = 1;
    const start = 1;

    database
      .expects("getEventPosts")
      .exactly(1)
      .withExactArgs(eid, start)
      .returns(null);

    const posts = await Event.getPosts(eid, start);

    expect(posts).to.be.an('array').that.is.empty;

    database.verify();
    event.verify();

    database.restore();
    event.restore();
  });
});

