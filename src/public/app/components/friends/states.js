var app = require('angular').module('app');

app.config(function($stateProvider) {

  'use strict';

  var previousState;

  $stateProvider.
    state('app.friends', {
      abstract: true,
      url: '/friends',
      template: '<ui-view></ui-view>'
    }).
    state('app.friends.list', {
      url: '/list',
      templateUrl: 'app/components/friends/friendsListView.html.tmpl',
      controller: 'friendsCtrl'
    }).
    state('app.friends.details', {
      url: '/details/:friendId',
      templateUrl: 'app/components/friends/friendsDetailView.html.tmpl',
      controller: 'friendsCtrl'
    }).
    state('app.friends.add', {
      url: '/add',
      templateUrl: 'app/components/friends/friendsAddView.html.tmpl',
      controller: 'friendsAddCtrl'
    }).
    state('app.friends.delete', {
      url: '/delete/:friendId',
      onEnter: function($stateParams, $state, $previousState, $uibModal) {
        previousState = $previousState.memo('previousState');
        $uibModal.open({
          templateUrl: 'app/components/friends/friendsDelete.html.tmpl',
          // @ngInject
          controller: function($scope, $log, Friend, $uibModalInstance) {
            // FIXME: Controller from a separate module.
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
          }
        }).result.finally(function() {
          $previousState.go('previousState');
        });
      }
    });

});
