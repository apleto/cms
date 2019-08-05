const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const populateContentBlocks = require('../../src/hooks/populate-content-blocks');

describe('\'populate-content-blocks\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: populateContentBlocks()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
