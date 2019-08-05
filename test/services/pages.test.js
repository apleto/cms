const assert = require('assert');
const app = require('../../src/app');

describe('\'pages\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/pages');

    assert.ok(service, 'Registered the service');
  });
});
