import { expect } from 'chai';
import Database from '../src/database';

describe('table1', async function() {
  it('event name should be \'DoCSoc - Introduction to Vim\'', async function() {
    const data = await Database.getAllEvents();
    expect(data[0].name).equal('DoCSoc - Introduction to Vim');
  });
});

