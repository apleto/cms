    
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


let contentTab = 'pages';
let contentState = 'create';
let updateService = null;

let recordID = null;


// var contentEditor = CodeMirror(document.getElementById('editor'), {
//   value: "// Your code here\n",
//   mode:  "pug",
//   indentUnit: 2,
//   //smartIndent: true,
//   lineNumbers: true

// });

// Retrieve email/password object from the login/signup page
const getCredentials = () => {
  const user = {
    email: $('[name="email"]').val(),
    password: $('[name="password"]').val()
  };

  return user;
};

const showLogin = async error => {
  window.location.href = '/admin/login';
}

const showAdmin = async () => {
  if(windowLocation.pathname == '/admin/login') {
    window.location.href = '/admin'
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

$('.dropdown-toggle').dropdown();

$( document ).ready( async () => {
  if(windowLocation.pathname != '/admin/login') {
    await login();
    $('ul').removeClass('auth-protected');

    $('.imageLiquid').imgLiquid();


  }

  if(windowLocation.pathname == '/admin/content') {
    const user = await client.get('user');
    console.log(user.contentTab)
    $(`#content-tabs #${user.contentTab}-tab`).tab('show');

  }
});

// execute when login-form is submitted
$('#login-form').on('submit', async (e) => {
  e.preventDefault();
  const user = getCredentials();
  await login(user);
});

// execute on logout
$('#logout').on('click', async () =>{
  
  client.logout()
    .then( response => {
      client.set('user', {})
      window.location.href='/admin/login';
    })
  
});

// on content page tab toggle

$('a[data-admin-page="content"]').on('shown.bs.tab', async function (e) {
  const user = client.get('user');
  contentTab = e.currentTarget.attributes['data-content-tab'].value;

  console.log(contentTab)

  
  user.contentTab = contentTab;
  client.service('users').patch(user._id, user);

  if(contentTab == 'comments' || contentTab == 'images') {
    $('#create-content').hide();
  } else {
    $('#create-content').show();
  }

})

$('#create-content').on('click', async () => {
  contentState = 'create';
  const user = client.get('user');
  user.contentState = contentState;
  user.createType = `${contentTab}s`
  client.service('users').patch(user._id, user);
  window.location.href = `/admin/content/${contentTab}/create`;
});


$('.tag-input').tagsinput({
  tagClass: 'bg-primary'
})





