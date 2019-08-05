// Initializes the `stylesheets` service on path `/api/stylesheets`
const createService = require('feathers-nedb');
const createModel = require('../../models/stylesheets.model');
const hooks = require('./stylesheets.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/stylesheets', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/stylesheets');

  service.hooks(hooks);
};
