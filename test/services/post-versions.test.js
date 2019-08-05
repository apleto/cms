const assert = require('assert');
const app = require('../../src/app');

describe('\'post-versions\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/post-versions');

    assert.ok(service, 'Registered the service');
  });
});
