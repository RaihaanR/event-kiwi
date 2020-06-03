import { expect } from 'chai';
import Database from '../src/database';

describe('database', async () => {
  it('test access (id = 1) should have correct \'val1\'', async () => {
    const data = await Database.getTestDetails(1);

    expect(data.val1).equal("hello world");
  });

  it('test access (id = 2) should have correct \'val2\'', async () => {
    const data = await Database.getTestDetails(2);

    expect(data.val2).equal(123);
  });

  it('test access (id = 3) should be invalid', async () => {
    const data = await Database.getTestDetails(3);

    expect(data).equal(null);
  });
});
