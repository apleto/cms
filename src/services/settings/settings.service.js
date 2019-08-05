// Initializes the `settings` service on path `/api/settings`
const createService = require('feathers-nedb');
const createModel = require('../../models/settings.model');
const hooks = require('./settings.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/settings', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/settings');

  service.hooks(hooks);
};
