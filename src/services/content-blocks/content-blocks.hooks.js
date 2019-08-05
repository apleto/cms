const { authenticate } = require('@feathersjs/authentication').hooks;

const processNewRecord = require('../../hooks/process-new-record');

const populateContentBlocks = require('../../hooks/populate-content-blocks');

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
    find: [populateContentBlocks()],
    get: [populateContentBlocks()],
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
