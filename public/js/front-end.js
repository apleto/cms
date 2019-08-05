/* global document, window, feathers, moment, io, $ */

// Retrive URL path
const windowLocation = window.location;

// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();

client.configure(feathers.socketio(socket));
// Use localStorage to store our login token
client.configure(feathers.authentication({
  storage: window.localStorage
}));

let currentPage = null;

// Retrieve email/password object from the login/signup page
const getCredentials = () => {
  const user = {
    email: $('[name="email"]').val(),
    password: $('[name="password"]').val()
  };

  return user;
};

const showLogin = async error => {
  window.location.href = '/login';
}

const loadCurrentPage = async () => {
  if(windowLocation.pathname == '/admin/login') {
    const user = client.get('user');
    window.location.href = user.currentPage;
  }
}

const login = async credentials => {
  try {
    if(!credentials) {
      // Try to authenticate using the JWT from localStorage
      await client.authenticate()
      .then(response => {
        //console.log('Authenticated!', response);
        return client.passport.verifyJWT(response.accessToken);
      })
      .then(payload => {
        //console.log('JWT Payload', payload);
        return client.service('users').get(payload.userId);
      })
      .then(async user => {
        await client.set('user', user);
        console.log('User', client.get('user'));
        showAdmin();

      });
    } else {
      // If we get login information, add the strategy we want to use for login
      const payload = Object.assign({ strategy: 'local' }, credentials);


      client.authenticate(payload)
      .then(response => {
        console.log('Authenticated!', response);
        return client.passport.verifyJWT(response.accessToken);
      })
      .then(payload => {
        console.log('JWT Payload', payload);
        return client.service('users').get(payload.userId);
      })
      .then(async user => {
        await client.set('user', user);
        console.log(user)
        showAdmin();
      });

      
    }

    // If successful, show the chat page
    
    
  } catch(error) {
    
    // If we got an error, show the login page
    showLogin(error);
  }
};

$( document ).ready( async () => {
  $('.dropdown-toggle').dropdown();
});



