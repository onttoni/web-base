define(['angular'], function(angular) {

  var friends = angular.module('friends');
  var getPersonDoc = require('../../shared/utils/personUtils').getPersonDoc;
  var extractDocData = require('../../shared/utils/personUtils').extractDocData;

  friends.controller('friendsCtrl', function($log, $scope, $state, $stateParams, Friend) {

    'use strict';

    $scope.getDetails = function() {
      $log.debug('Getting details for friend with id=' + $stateParams.friendId);
      Friend.get({id: $stateParams.friendId, fields: '-__v'},
        function(friend) {
          $log.debug('Got details:', friend);
          getPersonDoc($scope, friend, 'friendSchema');
        }
      );
    };

    $scope.update = function() {
      $log.debug('Updating details for friend with id=' + $stateParams.friendId);
      $scope.personDoc.validate(function(err) {
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
      $scope.getDetails();
    } else {
      $scope.friendsList = Friend.query({fields: 'name address'});
      $log.debug('Got list of friends:', $scope.friendsList);
    }

  });

});
