define(['angular','angular-resource'], function(angular) {

  var friends = angular.module('friends', ['ngResource']);

  require('./friendsCtrl');
  require('./friendsAddCtrl');
  require('./friendsDeleteCtrl');
  require('./friendsFactory');
  require('./states');

});
