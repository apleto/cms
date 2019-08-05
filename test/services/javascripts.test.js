const assert = require('assert');
const app = require('../../src/app');

describe('\'javascripts\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/javascripts');

    assert.ok(service, 'Registered the service');
  });
});
