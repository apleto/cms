const ta = require('time-ago');
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context;

    // Make sure that we always have a list of messages either by wrapping
    // a single message into an array or by getting the `data` from the `find` method result
    const sections = method === 'find' ? result.data : [ result ];

    // Asynchronously get user object from each messages `userId`
    // and add it to the message
    await Promise.all(sections.map(async section => {
      
      // const user = await app.service('users').get(section.created_by, params);
      // section.created = ta.ago(section.created);
      // section.updated = ta.ago(section.updated);
      // section.published_on = ta.ago(section.published_on);
      // section.created_by = user;

      if(section.type == 'content-block') {
        const block = await app.service('api/content-blocks').get(section.block);

        section.block = block;
      }
    }));

    //console.log(sections);

    // Best practise, hooks should always return the context
    return context;
  };
};