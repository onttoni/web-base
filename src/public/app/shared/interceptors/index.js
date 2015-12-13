define(['angular'], function(angular) {

  var interceptors = angular.module('interceptors', []);

  require('./http401');
  require('./jwt');

});
