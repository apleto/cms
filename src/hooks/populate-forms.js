const ta = require('time-ago');
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context;

    // Make sure that we always have a list of messages either by wrapping
    // a single message into an array or by getting the `data` from the `find` method result
    const forms = method === 'find' ? result.data : [ result ];

    // Asynchronously get user object from each messages `userId`
    // and add it to the message
    await Promise.all(forms.map(async form => {
      // We'll also pass the original `params` to the service call
      // so that it has the same information available (e.g. who is requesting it)
      //const user = await app.service('users').get(form.created_by, params);
      const responses = await app.service('api/form-data').find({
        query: {
          form: form._id
        }
      }, params);
      form.responses = responses
      // form.created = ta.ago(page.created);
      // form.updated = ta.ago(page.updated);
      // form.published_on = ta.ago(page.published_on);
      // form.created_by = user;
    }));


    // Best practise, hooks should always return the context
    return context;
  };
};