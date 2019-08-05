// Initializes the `content-blocks` service on path `/api/content-blocks`
const createService = require('feathers-nedb');
const createModel = require('../../models/content-blocks.model');
const hooks = require('./content-blocks.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/content-blocks', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/content-blocks');

  service.hooks(hooks);
};
