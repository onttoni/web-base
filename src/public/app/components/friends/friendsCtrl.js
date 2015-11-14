var app = require('angular').module('app');
var friendSchema = require('../../../../server/models/friendSchema');

app.controller('friendsCtrl', function($log, $scope, $state, $stateParams, Friend) {

  'use strict';

  $scope.friends = {};

  $scope.friends.getDetails = function() {
    $log.debug('Getting details for friend with id=' + $stateParams.friendId);
    Friend.get({id: $stateParams.friendId, fields: '-__v'},
      function(friend) {
        $log.debug('Got details:', friend);
        $scope.friends.details = mongoose.Document(friend, friendSchema);
      }
    );
  };

  $scope.friends.update = function() {
    $log.debug('Updating details for friend with id=' + $stateParams.friendId);
    $scope.friends.details.validate(function(err) {
      if (err) {
        $log.debug('Validation error when updating friend', err.errors);
        return;
      }
      var data = {};
      $scope.friends.details.displayFields().forEach(function(key) {
        data[key] = $scope.friends.details[key];
      });
      Friend.update({id: $stateParams.friendId, update: data}, function(friend) {
        $log.debug('Friend updated', friend);
      });
      $state.go('app.friends.list');
    });
  };

  if ($stateParams.friendId) {
    $scope.friends.getDetails();
  } else {
    $scope.friends.list = Friend.query({fields: 'firstName lastName address'});
    $log.debug('Got list of friends:', $scope.friends.list);
  }

});
