var app = require('angular').module('app');

app.factory('jwtInterceptor', function($rootScope, $q, $window) {

  'use strict';

  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        // RFC 6750 p. 5
        config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
      }
      return config;
    }
  };
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('jwtInterceptor');
});
