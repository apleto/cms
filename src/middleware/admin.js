// module.exports = function (options = {}) {
//   return function admin(req, res, next) {
//     console.log('admin middleware is running');
//     next();
//   };
// };

const moment = require('moment');
const html2pug = require('html2pug');

module.exports = {
  root: (options = {}) => {
    return async (req, res, next) => {
      res.render('admin/base');
    }
  },
  game: (options = {}) => {
    return async (req, res, next) => {
      res.render('admin/game');
    }
  },
  login: (options = {}) => {
    return async (req, res, next) => {
      res.render('admin/login');
    }
  },
  content: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const pages = await app.service('api/pages').find({
        query: {
          $sort: {
            title: -1
          }
        }
      });
      const posts = await app.service('api/posts').find();
      const content_blocks = await app.service('api/content-blocks').find();
      const comments = await app.service('api/comments').find();
      const images = await app.service('api/images').find();
      const forms = await app.service('api/forms').find();
      console.log(images);
      res.render('admin/content/base', { pages, posts, content_blocks, comments, images, forms });
    }
  },
  pages: (options = {}) => {
    return async (req, res, next) => {
      res.render('admin/content/pages/list', { pages });
    }
  },
  createPage: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const pages = await app.service('api/pages').find({
        query: {
          $sort: {
            title: 1
          }
        }
      });
      const content_blocks = await app.service('api/content-blocks').find();
      res.render('admin/content/create-page', { pages });
    }
  },
  editPage: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const pages = await app.service('api/pages').find({
        query: {
          $sort: {
            title: 1
          }
        }
      });
      // get page we are editing
      const page = await app.service('api/pages').get(req.params.id);

      // get page sections
      const sections = await app.service('api/page-sections').find({
        query: {
          page: page._id,
          $sort: {
            display_order: 1
          }
        }
      });

      // get content blocks
      const content_blocks = await app.service('api/content-blocks').find();

      // get media
      const media = {
        images: await app.service('uploads').find()
      }
      res.render('admin/content/edit-page', { page, pages, sections, content_blocks, media });
    }
  },
  createContentBlock: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const images = await app.service('api/images').find();
      res.render('admin/content/create-content-block', { images });
    }
  },
  editContentBlock: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const block = await app.service('api/content-blocks').get(req.params.id)
      const images = await app.service('api/images').find();
      res.render('admin/content/edit-content-block', { block, images });
    }
  },
  editContentBlockWithGrapes: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const block = await app.service('api/content-blocks').get(req.params.id)
      res.render('admin/content/edit-content-block-with-grapes', { block });
    }
  },
  createPost: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const images = await app.service('api/images').find();
      const tags = await app.service('api/tags').find();
      res.render('admin/content/create-post', { tags, images });
    }
  },
  editPost: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const images = await app.service('api/images').find();
      const tags = await app.service('api/tags').find();
      const post = await app.service('api/posts').get(req.params.id);
      // const content = html2pug(post.post_content, { fragment: true});

      // console.log(content)
      // post.post_content = content;
      res.render('admin/content/edit-post', { tags, images, post });
    }
  },
  createForm: (options = {}) => {
    return async (req, res, next) => {
      res.render('admin/content/create-form');
    }
  },
  editForm: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const form = await app.service('api/forms').get(req.params.id)
      res.render('admin/content/edit-form', { form });
    }
  },
  users: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const users = await app.service('users').find();
      const roles = await app.service('api/user_roles').find();
      res.render('admin/users/user-list', { users, roles });
    }
  },
  createUser: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const roles = await app.service('api/user_roles').find();
      res.render('admin/users/create-user', { roles });
    }
  },
  editUser: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const user = await app.service('users').get(req.params.id);
      const roles = await app.service('api/user_roles').find();
      res.render('admin/users/edit-user', { user, roles });
    }
  },
  changePassword: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const user = await app.service('users').get(req.params.id);
      const roles = await app.service('api/user_roles').find();
      res.render('admin/users/change-password', { user, roles });
    }
  },
  settings: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const settings = await app.service('api/settings').find();
      res.render('admin/settings/base', { settings });
    }
  },

}
