// Initializes the `page-sections` service on path `/page-sections`
const createService = require('feathers-nedb');
const createModel = require('../../models/page-sections.model');
const hooks = require('./page-sections.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/page-sections', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/page-sections');

  service.hooks(hooks);
};
