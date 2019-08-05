const assert = require('assert');
const app = require('../../src/app');

describe('\'page-versions\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/page-versions');

    assert.ok(service, 'Registered the service');
  });
});
