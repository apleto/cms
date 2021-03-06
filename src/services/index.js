const settings = require('./settings/settings.service.js');
const stylesheets = require('./stylesheets/stylesheets.service.js');
const javascripts = require('./javascripts/javascripts.service.js');
const pages = require('./pages/pages.service.js');
const posts = require('./posts/posts.service.js');
const comments = require('./comments/comments.service.js');
const users = require('./users/users.service.js');
const userRoles = require('./user_roles/user_roles.service.js');
const parts = require('./parts/parts.service.js');
const tags = require('./tags/tags.service.js');
const contentBlocks = require('./content-blocks/content-blocks.service.js');
const pageSections = require('./page-sections/page-sections.service.js');
const pageVersions = require('./page-versions/page-versions.service.js');
const postVersions = require('./post-versions/post-versions.service.js');
const contentBlockVersions = require('./content-block-versions/content-block-versions.service.js');
const uploads = require('./uploads/uploads.service.js');
const images = require('./images/images.service.js');
const forms = require('./forms/forms.service.js');
const formData = require('./form-data/form-data.service.js');
const version = require('./version/version.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(settings);
  app.configure(stylesheets);
  app.configure(javascripts);
  app.configure(pages);
  app.configure(posts);
  app.configure(comments);
  app.configure(users);
  app.configure(userRoles);
  app.configure(parts);
  app.configure(tags);
  app.configure(contentBlocks);
  app.configure(pageSections);
  app.configure(pageVersions);
  app.configure(postVersions);
  app.configure(contentBlockVersions);
  app.configure(images);
  app.configure(uploads);
  app.configure(forms);
  app.configure(formData);
  app.configure(version);
};
