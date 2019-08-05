const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/assets', express.static(app.get('public')));
app.use('/uploads', express.static(app.get('uploads')));
app.use('/node_modules', express.static(app.get('node_modules')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);


const setup = async () => {

  let settings = await app.service('api/settings').find({ query: {$limit: 250} });

  if(settings.total == 6) {
    const settings = [
      {
        _id: "cms_version",
        info: "the version of the CMS server, used to see if we need to run update scripts",
        value: 1,
        hidden: true
      },
      {
        _id: "blog_post_page",
        info: "the id of the page to use for individual blog posts",
        value: 'blog-post'
      }
    ]
    

    settings.forEach(async s => {
      await app.service('api/settings').create(s);
    })
  }
  if(settings.total == 0) {
    const site_settings = [
      {
        _id: "site_title",
        info: "a global variable that stores the site title",
        value: "A website!"
      },
      {
        _id: "site_slogan",
        info: 'a quick blurb about your site',
        value: "something awesome..."
      },
      {
        _id: "home_page",
        info: 'the id of the page to use for the sites home page',
        value: "home"
      },
      {
        _id: "blog_page",
        info: 'the id of the page to use for the sites blog posts page',
        value: "blog",
      },
      {
        _id: 'blog_enabled',
        info: 'enable or disable the blog functionality',
        value: "true"
      },
      {
        _id: 'header_content_block',
        info: 'id of the content block to use by default on all pages.',
        value: 'site-header'
      }
    ]

    const pages = [
      {
        _id: 'home',
        title: 'Home',
        state: 'Published',
      },
      {
        _id: 'blog',
        title: 'Blog',
        state: 'Published',
      },
      {
        _id: 'blog-post',
        title: 'Blog Post',
        state: 'Published',
      }
    ]

    const user_roles = [
      {
        _id: "admin",
        name: "Administrator"
      },
      {
        _id: "user",
        name: "User"
      }
    ]

    const blocks = [
      {
        _id: 'site-header',
        title: 'Site Header',
        pug_template: 'a(href="/admin") Click here to get started.'
      },
      {
        _id: 'blog-post',
        title: 'Blog Post',
        pug_template: 'h1 Blog Post'
      }
    ]


    const admin = await app.service('users').create({
      first_name: 'System',
      last_name: 'Admin',
      email: 'admin@change.me',
      password: 'P0pc0rn1',
      role: 'admin'
    });

    site_settings.forEach( async s => {
      await app.service('api/settings').create(s);
    });

    user_roles.forEach( async r => {
      await app.service('api/user_roles').create(r);
    });


  } else {
    return;
  }
}

setup();

module.exports = app;
