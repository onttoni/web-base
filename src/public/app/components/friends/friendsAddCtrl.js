var app = require('angular').module('app');
var friendSchema = require('../../../../server/models/friendSchema');

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
      Object.getOwnPropertyNames($scope.friends.added).forEach(function(key) {
        if (key[0] !== '_') {
          data[key] = $scope.friends.added[key];
        }
      });
      new Friend(data).$save(function(newFriend) {
        $log.debug('New friend is', newFriend);
      });
      $state.go('app.friends.list');
    });
  };

});
