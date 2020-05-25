import { expect } from 'chai';
import Database from '../src/Database';

describe('table1', async function() {
  it('first name should be \'Apple\'', async function() {
    const data = await Database.db().any('SELECT name FROM test.table1');
    expect(data[0].name).equal("Apple");
  });
});
