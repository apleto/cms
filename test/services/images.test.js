const assert = require('assert');
const app = require('../../src/app');

describe('\'images\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/images');

    assert.ok(service, 'Registered the service');
  });
});
