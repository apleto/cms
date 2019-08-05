// Initializes the `version` service on path `/api/version`
const createService = require('feathers-nedb');
const createModel = require('../../models/version.model');
const hooks = require('./version.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/version', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/version');

  service.hooks(hooks);
};
