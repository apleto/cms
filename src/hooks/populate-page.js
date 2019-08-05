const ta = require('time-ago');
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context;

    // Make sure that we always have a list of messages either by wrapping
    // a single message into an array or by getting the `data` from the `find` method result
    const pages = method === 'find' ? result.data : [ result ];

    // Asynchronously get user object from each messages `userId`
    // and add it to the message
    await Promise.all(pages.map(async page => {
      
      const user = await app.service('users').get(page.created_by, params);
      page.created = ta.ago(page.created);
      page.updated = ta.ago(page.updated);
      page.published_on = ta.ago(page.published_on);
      page.created_by = user;
    }));

    await Promise.all(pages.map(async page => {
      const user = await app.service('users').get(page.updated_by, params);

      page.updated_by = user;
    }));

    // Best practise, hooks should always return the context
    return context;
  };
};