var app = require('angular').module('app');
var friendSchema = require('models/friendSchema');

app.controller('friendsAddCtrl', function($log, $scope, $state, Friend) {

  'use strict';

  $scope.friends = {};
  $scope.friends.paths = {};

  $scope.friends.added = mongoose.Document({}, friendSchema);

  $scope.friends.save = function() {
    $log.debug('Adding friend', $scope.friends.added);
    $scope.friends.added.validate(function(err) {
      if (err) {
        $log.debug('Validation error when adding friend', err.errors);
        return;
      }
      var data = {};
      $scope.friends.added.displayFields().forEach(function(key) {
        data[key] = $scope.friends.added[key];
      });
      $log.debug('Friend data is', data);
      new Friend({add: data}).$save(function(newFriend) {
        $log.debug('New friend is', newFriend);
      });
      $state.go('app.friends.list');
    });
  };

});
