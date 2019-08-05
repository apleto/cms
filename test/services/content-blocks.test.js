const assert = require('assert');
const app = require('../../src/app');

describe('\'content-blocks\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/content-blocks');

    assert.ok(service, 'Registered the service');
  });
});
