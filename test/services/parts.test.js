const assert = require('assert');
const app = require('../../src/app');

describe('\'parts\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/parts');

    assert.ok(service, 'Registered the service');
  });
});
