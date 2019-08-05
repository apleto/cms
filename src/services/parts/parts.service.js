// Initializes the `parts` service on path `/api/parts`
const createService = require('feathers-nedb');
const createModel = require('../../models/parts.model');
const hooks = require('./parts.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/parts', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/parts');

  service.hooks(hooks);
};
