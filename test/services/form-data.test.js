const assert = require('assert');
const app = require('../../src/app');

describe('\'form-data\' service', () => {
  it('registered the service', () => {
    const service = app.service('form-data');

    assert.ok(service, 'Registered the service');
  });
});
