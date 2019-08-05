// Initializes the `page-versions` service on path `/api/page-versions`
const createService = require('feathers-nedb');
const createModel = require('../../models/page-versions.model');
const hooks = require('./page-versions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/page-versions', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/page-versions');

  service.hooks(hooks);
};
