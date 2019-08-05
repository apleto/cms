// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { params, data } = context

    const date = new Date();
    data.created = date;
    data.updated = date;
    data.created_by = params.user._id;
    data.updated_by = params.user._id;

    data.versions = [];
    data.status = 'Draft'

    context.data = data;

    return context;
  };
};
