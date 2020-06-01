import { expect } from 'chai';
import Database from '../src/database';

describe('event', async function() {
  it('event name should be \'DoCSoc - Introduction to Vim\'', async function() {
    const data = await Database.getAllEventCardDetails();
    let min = 0;

    for (let i = 0; i < data.length; i++) {
      if (+data[i]['event_id'] < +data[min]['event_id']) {
        min = i;
      }
    }

    expect(data[min]['event_name']).equal('DoCSoc - Introduction to Vim');
  });
});

