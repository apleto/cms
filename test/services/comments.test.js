const assert = require('assert');
const app = require('../../src/app');

describe('\'comments\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/comments');

    assert.ok(service, 'Registered the service');
  });
});
