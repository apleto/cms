const assert = require('assert');
const app = require('../../src/app');

describe('\'stylesheets\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/stylesheets');

    assert.ok(service, 'Registered the service');
  });
});
