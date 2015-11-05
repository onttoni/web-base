var app = require('angular').module('app');

app.factory('Friend', function($resource) {

  return $resource('/api/friends/:id', {id: '@_id'},
    {
      add: {method: 'POST'},
      update: {method: 'PUT'},
    }
  );

});
