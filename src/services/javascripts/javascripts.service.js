// Initializes the `javascripts` service on path `/api/javascripts`
const createService = require('feathers-nedb');
const createModel = require('../../models/javascripts.model');
const hooks = require('./javascripts.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/javascripts', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/javascripts');

  service.hooks(hooks);
};
