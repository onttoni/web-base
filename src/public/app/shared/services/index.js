define(['angular','angular-resource'], function(angular) {

  var services = angular.module('services', ['ngResource']);

  require('./socketService');
  require('./userService');

});
