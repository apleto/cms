const { authenticate } = require('@feathersjs/authentication').hooks;

const processNewRecord = require('../../hooks/process-new-record');

const populatePage = require('../../hooks/populate-page');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processNewRecord()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populatePage()],
    get: [populatePage()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
