// Initializes the `form-data` service on path `/form-data`
const createService = require('feathers-nedb');
const createModel = require('../../models/form-data.model');
const hooks = require('./form-data.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/form-data', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/form-data');

  service.hooks(hooks);
};
