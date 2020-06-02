import { expect } from 'chai';
import Database from '../src/database';

describe('societies', async function() {
  it('society colour should be \'272727\'', async function() {
    const data = await Database.getSocietyColour(0);

    expect(data.colour).equal('272727');
  });
});

describe('files', async function() {
  it('file name should be \'test.txt\'', async function() {
    const data = await Database.getFileName("_test");

    expect(data.display_name).equal('test.txt');
  });
});

