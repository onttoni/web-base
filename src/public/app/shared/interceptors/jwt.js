var app = require('angular').module('app');

app.factory('jwtInterceptor', function($q, $window) {

  'use strict';

  return {
    request: function(request) {
      request.headers = request.headers || {};
      if ($window.localStorage.token) {
        // RFC 6750 p. 5
        request.headers.Authorization = 'Bearer ' + $window.localStorage.token;
      }
      return request;
    }
  };
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('jwtInterceptor');
});
