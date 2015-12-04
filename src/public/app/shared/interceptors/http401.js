var app = require('angular').module('app');

app.factory('http401Interceptor', function($q, $injector) {

  'use strict';

  return {
    response: function(response) {
      return response || $q.when(response);
    },
    responseError: function(response) {
      if (response.status === 401) {
        $injector.get('$state').go('app.user.login');
      }
      return $q.reject(response);
    }
  };
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('http401Interceptor');
});
