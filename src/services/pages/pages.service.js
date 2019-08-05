// Initializes the `pages` service on path `/api/pages`
const createService = require('feathers-nedb');
const createModel = require('../../models/pages.model');
const hooks = require('./pages.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/pages', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/pages');

  service.hooks(hooks);
};
