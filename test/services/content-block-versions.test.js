const assert = require('assert');
const app = require('../../src/app');

describe('\'content-block-versions\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/content-block-versions');

    assert.ok(service, 'Registered the service');
  });
});
