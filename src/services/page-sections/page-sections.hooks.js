const { authenticate } = require('@feathersjs/authentication').hooks;

const processNewRecord = require('../../hooks/process-new-record');
const populateSection = require('../../hooks/populate-page-section');

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
    find: [populateSection()],
    get: [populateSection()],
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
