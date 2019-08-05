const assert = require('assert');
const app = require('../../src/app');

describe('\'page-sections\' service', () => {
  it('registered the service', () => {
    const service = app.service('page-sections');

    assert.ok(service, 'Registered the service');
  });
});
