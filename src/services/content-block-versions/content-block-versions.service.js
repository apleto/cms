// Initializes the `content-block-versions` service on path `/api/content-block-versions`
const createService = require('feathers-nedb');
const createModel = require('../../models/content-block-versions.model');
const hooks = require('./content-block-versions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/content-block-versions', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/content-block-versions');

  service.hooks(hooks);
};
