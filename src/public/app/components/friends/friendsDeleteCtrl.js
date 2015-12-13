define(['angular'], function(angular) {

  var friends = angular.module('friends');

  friends.controller('friendsDeleteCtrl', function($log, $scope, $stateParams, $uibModalInstance, Friend) {

    'use strict';

    $scope.friends = {};
    $scope.friends.deleted = Friend.get({id: $stateParams.friendId});

    $scope.friends.delete = function(friendId) {
      $log.debug('Deleting friend with id=' + friendId);
      Friend.delete({id: friendId}, function(result) {
        $log.debug('Deletion result', result);
        $uibModalInstance.close();
      });
    };

    $scope.friends.close = function() {
      $uibModalInstance.close();
    };
  });

});
