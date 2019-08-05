const { authenticate } = require('@feathersjs/authentication').hooks;

const populateForms = require('../../hooks/populate-forms');
const processNewRecord = require('../../hooks/process-new-record');

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
    find: [populateForms()],
    get: [populateForms()],
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
