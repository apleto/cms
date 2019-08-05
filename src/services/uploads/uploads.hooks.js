
const processUpload = require('../../hooks/process-upload');
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [processUpload()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
