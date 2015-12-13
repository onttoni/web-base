define(['angular'], function(angular) {

  var app = angular.module('app');

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
        templateUrl: 'app/components/friends/list.html.tmpl',
        controller: 'friendsCtrl'
      }).
      state('app.friends.details', {
        url: '/details/:friendId',
        templateUrl: 'app/components/friends/details.html.tmpl',
        controller: 'friendsCtrl'
      }).
      state('app.friends.add', {
        url: '/add',
        templateUrl: 'app/components/friends/add.html.tmpl',
        controller: 'friendsAddCtrl'
      }).
      state('app.friends.delete', {
        url: '/delete/:friendId',
        onEnter: function($previousState, $uibModal) {
          previousState = $previousState.memo('previousState');
          $uibModal.open({
            templateUrl: 'app/components/friends/delete.html.tmpl',
            controller: 'friendsDeleteCtrl'
          }).result.finally(function() {
            $previousState.go('previousState');
          });
        }
      });

  });

});
