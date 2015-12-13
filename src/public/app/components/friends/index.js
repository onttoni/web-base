define(['angular','angular-resource', 'angular-ui-bootstrap'], function(angular) {

  var friends = angular.module('friends', ['ngResource']);

  require('./friendsCtrl');
  require('./friendsAddCtrl');
  require('./friendsDeleteCtrl');
  require('./friendsFactory');
  require('./states');

});
