// @ngInject
module.exports = function ($scope, $log, Friend, close, friend) {

  'use strict';

  $scope.friends = {};
  $scope.friends.deleted = friend;

  $scope.friends.delete = function() {
    $log.debug('Deleting friend with id=' + friend._id);
    Friend.delete({ id: friend._id }, function(result) {
      $log.debug('Deletion result', result);
      close(result, 200);
    });
  };

};