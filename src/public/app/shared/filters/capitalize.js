var app = require('angular').module('app');

app.filter('capitalize', function() {

  'use strict';

  return function(token) {
    return token.charAt(0).toUpperCase() + token.slice(1);
  };

});
