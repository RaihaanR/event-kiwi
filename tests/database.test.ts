import { expect } from 'chai';
import Database from '../src/database';

describe('table1', async function() {
  it('first name should be \'Apple\'', async function() {
    const data = await Database.getColTable1('name');
    expect(data[0].name).equal("Apple");
  });
});

