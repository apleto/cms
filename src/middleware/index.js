const cookieParser = require('cookie-parser');
const { authenticate } = require('@feathersjs/authentication').express;

const admin = require('./admin');
const site = require('./site');
const frontEnd = require('./front-end');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.set('view engine', 'pug');

  app.get('/admin/content/content-blocks/create', admin.createContentBlock());
  app.get('/admin/content/content-blocks/edit/:id', admin.editContentBlock());
  app.get('/admin/content/forms/create', admin.createForm());
  app.get('/admin/content/forms/edit/:id', admin.editForm());
  app.get('/admin/content/content-blocks/edit-with-grapes/:id', admin.editContentBlockWithGrapes());
  app.get('/admin/content/pages/create', admin.createPage());
  app.get('/admin/content/pages', admin.pages());
  app.get('/admin/content/pages/edit/:id', admin.editPage());
  app.get('/admin/content/posts/create', admin.createPost());
  app.get('/admin/content/posts/edit/:id', admin.editPost());
  app.get('/admin/content', admin.content());
  app.get('/admin/settings', admin.settings());
  app.get('/admin/change-password/:id', admin.changePassword());
  app.get('/admin/edit-user/:id', admin.editUser());
  app.get('/admin/create-user', admin.createUser());
  app.get('/admin/users', admin.users());
  app.get('/admin/login', admin.login());
  app.get('/admin/game', admin.game());
  app.get('/admin', admin.root());

  // app.get('/login', frontEnd.login());
  // app.get('/register', frontEnd.register());

  app.get('/', frontEnd.root());
  app.get('/blog', frontEnd.renderBlog());
  app.get('/blog/:post', frontEnd.renderBlogPost());
  app.get('/:page', frontEnd.renderPage());

  
  

  // app.use(frontEnd());
};
