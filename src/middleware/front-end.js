// module.exports = function (options = {}) {
//   return function admin(req, res, next) {
//     console.log('admin middleware is running');
//     next();
//   };
// };

const Q = require('q');
const fs = require('fs');
const path = require('path');
const html2pug = require('html2pug');



const pug = require('pug');


const getBase = () => {

  const defer = new Q.defer;

  fs.readFile(path.join(__dirname, '../../views/front-end/base.pug'), (error, data) => {
    defer.resolve(data);
  });

  return defer.promise;

}


module.exports = {
  root: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const pageSections = [];
      let pageContent = '';
      let has_home_page = true;



      // get site settings
      const site_title = await app.service('api/settings').get('site_title');
      const site_home_page = await app.service('api/settings').get('home_page');
      const site_header = await app.service('api/settings').get('header_content_block');

      // get content blocks
      const header = await app.service('api/content-blocks').get(site_header.value);
      const page = await app.service('api/pages').get(site_home_page.value);



      // get page sections
      const sections = await app.service('api/page-sections').find({
        query: {
          page: page._id,
          $sort: {
            display_order: 1
          }
        }
      });

      const base = await getBase();

      pageContent = pageContent + base + '\n';


      pageContent = pageContent + header.pug_template

      console.log(site_title);
    

      for ( var i in sections.data ) {
        pageContent = pageContent + '\n' + sections.data[i].block.pug_template;
      };

      const images = await app.service('api/images').find();
      const forms  = await app.service('api/forms').find();

      
      const echo = (text) => {
        return text;
      }

      const image = name => {
        for ( var i in images.data ) {
          if( images.data[i].name == name ) {
            console.log(images.data[i].name)
            return images.data[i].uri;
          }
        }
      }

      try {

        const fn = pug.compile(pageContent)


        // //res.render('front-end/base', { site_title, has_home_page });
        var html = fn({ site_title, has_home_page, echo, images, image, forms: forms.data })
        res.send(html)
  

      }
      catch ( error ) {

        res.send(error);

      }



      //res.send('hi')
    }
  },
  renderPage: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;

      let pageContent = '';
      
      let page_found = true;
      // get site settings
      const site_title = await app.service('api/settings').get('site_title');
      const site_home_page = await app.service('api/settings').get('home_page');
      const site_header = await app.service('api/settings').get('header_content_block');

      // get content blocks
      const header = await app.service('api/content-blocks').get(site_header.value);
      

      pageContent = pageContent + header.pug_template

      const images = await app.service('api/images').find();
      const forms  = await app.service('api/forms').find();

      
      const echo = (text) => {
        return text;
      }

      const image = name => {
        for ( var i in images.data ) {
          if( images.data[i].name == name ) {
            console.log(images.data[i].name)
            return images.data[i].uri;
          }
        }
      }

      try {
        const page = await app.service('api/pages').get(req.params.page);

        // get page sections
        const sections = await app.service('api/page-sections').find({
          query: {
            page: page._id,
            $sort: {
              display_order: 1
            }
          }
        });
      
        for ( var i in sections.data ) {
          // const block = await app.service('api/content-blocks').get(sections.data[i].block);
          pageContent = pageContent + '\n' + sections.data[i].block.pug_template;
        };
        
        const fn = pug.compile(pageContent)

        //res.render('front-end/base', { site_title, has_home_page });
        var html = fn({ site_title, page, forms: forms.data, echo, images, image })
        res.send(html)
      } catch( error ) {
        console.log(error)
        res.send('page not found...')
      }      
    }
  },
  renderBlogPost: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const pageSections = [];
      let pageContent = '';
      let has_home_page = true;



      // get site settings
      const site_title = await app.service('api/settings').get('site_title');
      const site_home_page = await app.service('api/settings').get('home_page');
      const site_header = await app.service('api/settings').get('header_content_block');
      const blog_post_page = await app.service('api/settings').get('blog_post_page');

      // get content blocks
      const header = await app.service('api/content-blocks').get(site_header.value);
      const page = await app.service('api/pages').get(blog_post_page.value);

      // get page sections
      const sections = await app.service('api/page-sections').find({
        query: {
          page: page._id
        }
      });

      // get blog post data
      const post = await app.service('api/posts').get(req.params.post);

      const base = await getBase();

      pageContent = pageContent + base + '\n';


      pageContent = pageContent + header.pug_template

      console.log(post)

      // var postContent = html2pug(post.post_content, { fragment: true })

      // post.post_content = postContent;
    

      for ( var i in sections.data ) {
        pageContent = pageContent + '\n' + sections.data[i].block.pug_template;
      };

      const images = await app.service('api/images').find();
      const forms  = await app.service('api/forms').find();

      
      const echo = (text) => {
        return text;
      }

      const image = name => {
        for ( var i in images.data ) {
          if( images.data[i].name == name ) {
            console.log(images.data[i].name)
            return images.data[i].uri;
          }
        }
      }

      try {

        const fn = pug.compile(pageContent)


        // //res.render('front-end/base', { site_title, has_home_page });
        var html = fn({ site_title, has_home_page, echo, images, image, forms: forms.data, post })
        res.send(html)
  

      }
      catch ( error ) {

        res.send(error);

      }



      //res.send('hi')
    }
  },
  renderBlog: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      const pageSections = [];
      let pageContent = '';
      let has_home_page = true;



      // get site settings
      const site_title = await app.service('api/settings').get('site_title');
      const site_home_page = await app.service('api/settings').get('home_page');
      const site_header = await app.service('api/settings').get('header_content_block');

      // get content blocks
      const header = await app.service('api/content-blocks').get(site_header.value);
      const page = await app.service('api/pages').get(site_home_page.value);

      // get page sections
      const sections = await app.service('api/page-sections').find({
        query: {
          page: page._id
        }
      });

      const base = await getBase();

      pageContent = pageContent + base + '\n';


      pageContent = pageContent + header.pug_template
    

      for ( var i in sections.data ) {
        pageContent = pageContent + '\n' + sections.data[i].block.pug_template;
      };

      const images = await app.service('api/images').find();
      const forms  = await app.service('api/forms').find();

      
      const echo = (text) => {
        return text;
      }

      const image = name => {
        for ( var i in images.data ) {
          if( images.data[i].name == name ) {
            console.log(images.data[i].name)
            return images.data[i].uri;
          }
        }
      }

      try {

        const fn = pug.compile(pageContent)


        // //res.render('front-end/base', { site_title, has_home_page });
        var html = fn({ site_title, has_home_page, echo, images, image, forms: forms.data })
        res.send(html)
  

      }
      catch ( error ) {

        res.send(error);

      }



      //res.send('hi')
    }
  },
  login: (options = {}) => {
    return async (req, res, next) => {
      const { app } = req;
      // get site settings
      const site_title = await app.service('api/settings').get('site_title');
      console.log(site_title)
      const site_home_page = await app.service('api/settings').get('home_page');
      const site_header = await app.service('api/settings').get('header_content_block');
      res.render('front-end/login', {site_title});
    }
  },
  register: (options = {}) => {
    return async (req, res, next) => {
      res.render('front-end/register');
    }
  },
}
