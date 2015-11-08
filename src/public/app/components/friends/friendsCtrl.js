var app = require('angular').module('app');

app.controller('friendsCtrl', function($log, $stateParams, $scope, Friend) {

  'use strict';

  $scope.friends = {};

  $scope.friends.getDetails = function() {
    $log.debug('Getting details for friend with id=' + $stateParams.friendId);
    Friend.get({id: $stateParams.friendId, fields: '-__v'},
      function(friend) {
        $log.debug('Got details:', friend);
        $scope.friends.details = friend;
      }
    );
  };

  $scope.friends.update = function() {
    $log.debug('Updating details for friend with id=' + $stateParams.friendId);
    Friend.update({id: $stateParams.friendId, update: $scope.friends.details},
      function(friend) {
      //$scope.friends.details = friend;
    });
  };

  if ($stateParams.friendId) {
    $scope.friends.getDetails();
  } else {
    $scope.friends.list = Friend.query({fields: 'name address'});
    $log.debug('Got list of friends:', $scope.friends.list);
  }

});
