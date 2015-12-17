define(['angular', 'shared/utils/personUtils'], function(angular, personUtils) {

  var friends = angular.module('friends');

  friends.controller('friendsAddCtrl', function($log, $scope, $state, Friend) {

    'use strict';

    personUtils.getPersonDoc($scope, {}, 'friendSchema');

    $scope.save = function() {
      $log.debug('Adding friend', $scope.friendDoc);
      $scope.personDoc.validate(function(err) {
        if (err) {
          $log.debug('Validation error when adding friend', err.errors);
          return;
        }
        new Friend({add: personUtils.extractDocData($scope)}).$save(function(newFriend) {
          $log.debug('New friend is', newFriend);
        });
        $state.go('app.friends.list');
      });
    };

  });

});
