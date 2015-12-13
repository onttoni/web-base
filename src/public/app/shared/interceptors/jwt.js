define(['angular'], function(angular) {

  var interceptors = angular.module('interceptors');

  interceptors.factory('jwtInterceptor', function($q, $window) {

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

  interceptors.config(function($httpProvider) {
    $httpProvider.interceptors.push('jwtInterceptor');
  });

});
