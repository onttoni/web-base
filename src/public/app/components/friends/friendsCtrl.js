var app = require('angular').module('app');
var getFriendDoc = require('./friendsUtils').getFriendDoc;
var extractDocData = require('./friendsUtils').extractDocData;

app.controller('friendsCtrl', function($log, $scope, $state, $stateParams, Friend) {

  'use strict';

  $scope.friends = {};

  $scope.friends.getDetails = function() {
    $log.debug('Getting details for friend with id=' + $stateParams.friendId);
    Friend.get({id: $stateParams.friendId, fields: '-__v'},
      function(friend) {
        $log.debug('Got details:', friend);
        getFriendDoc($scope, friend);
      }
    );
  };

  $scope.friends.update = function() {
    $log.debug('Updating details for friend with id=' + $stateParams.friendId);
    $scope.friends.friendDoc.validate(function(err) {
      if (err) {
        $log.debug('Validation error when updating friend', err.errors);
        return;
      }
      Friend.update({id: $stateParams.friendId, update: extractDocData($scope)}, function(friend) {
        $log.debug('Friend updated', friend);
      });
      $state.go('app.friends.list');
    });
  };

  if ($stateParams.friendId) {
    $scope.friends.getDetails();
  } else {
    $scope.friends.list = Friend.query({fields: 'name address'});
    $log.debug('Got list of friends:', $scope.friends.list);
  }

});
