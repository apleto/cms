// Initializes the `user_roles` service on path `/api/user_roles`
const createService = require('feathers-nedb');
const createModel = require('../../models/user_roles.model');
const hooks = require('./user_roles.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/user_roles', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/user_roles');

  service.hooks(hooks);
};
