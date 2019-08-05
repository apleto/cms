// Initializes the `images` service on path `/api/images`
const createService = require('feathers-nedb');
const createModel = require('../../models/images.model');
const hooks = require('./images.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/images', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/images');

  service.hooks(hooks);
};
