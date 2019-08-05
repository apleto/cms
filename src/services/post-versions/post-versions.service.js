// Initializes the `post-versions` service on path `/api/post-versions`
const createService = require('feathers-nedb');
const createModel = require('../../models/post-versions.model');
const hooks = require('./post-versions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/post-versions', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/post-versions');

  service.hooks(hooks);
};
