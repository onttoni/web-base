var app = require('angular').module('app');

app.controller('friendsCtrl', function($log, $stateParams, $scope, ModalService, Friend) {

  'use strict';

  $scope.friends = {};

  $scope.friends.showAddModal = function() {
    $log.debug('Show modal for adding friend');
    ModalService.showModal({
      templateUrl: 'app/components/friends/friendsAdd.html.tmpl',
      controller: 'friendsAddCtrl',
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(newFriend) {
        $scope.friends.list.push(newFriend);
      });
    });
  };

  $scope.friends.showDeleteModal = function(friendId) {
    $log.debug('Show modal for confirm friend delete id=' + friendId);
    var deletedFriend = Friend.get({id: friendId});
    ModalService.showModal({
      templateUrl: 'app/components/friends/friendsDelete.html.tmpl',
      controller: 'friendsDeleteCtrl',
      inputs: {
        friend: deletedFriend,
      },
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.friends.list.splice($scope.friends.list.map(function(x) {return x._id; }).indexOf(deletedFriend._id), 1);
      });
    });
  };

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
