var app = require('angular').module('app');

app.factory('User', function($resource) {

  return $resource('/api/users/:id', {id: '@_id'},
    {
      signUp: {method: 'POST', params: {signup: true}},
      update: {method: 'PUT'},
      logout: {method: 'GET', params: {logout: true}},
      login: {method: 'POST', params: {login: true}}
    }
  );

});
