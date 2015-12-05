var app = require('angular').module('app');
var getFriendDoc = require('./friendsUtils').getFriendDoc;
var extractDocData = require('./friendsUtils').extractDocData;

app.controller('friendsAddCtrl', function($log, $scope, $state, Friend) {

  'use strict';

  $scope.friends = {};

  getFriendDoc($scope, {});

  $scope.friends.save = function() {
    $log.debug('Adding friend', $scope.friends.friendDoc);
    $scope.friends.friendDoc.validate(function(err) {
      if (err) {
        $log.debug('Validation error when adding friend', err.errors);
        return;
      }
      new Friend({add: extractDocData($scope)}).$save(function(newFriend) {
        $log.debug('New friend is', newFriend);
      });
      $state.go('app.friends.list');
    });
  };

});
