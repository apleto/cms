const assert = require('assert');
const app = require('../../src/app');

describe('\'version\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/version');

    assert.ok(service, 'Registered the service');
  });
});
