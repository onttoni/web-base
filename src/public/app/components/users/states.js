var app = require('angular').module('app');

app.config(function($stateProvider) {

  'use strict';

  var previousState;

  $stateProvider.
    state('app.users', {
      abstract: true,
      template: '<ui-view></ui-view>'
    }).
    state('app.users.login', {
      url: '/login',
      onEnter: function($stateParams, $state, $previousState, $uibModal) {
        previousState = $previousState.memo('previousState');
        $uibModal.open({
          templateUrl: 'app/components/users/login.html.tmpl',
          controller: 'usersLoginCtrl'
        }).result.finally(function() {
          $previousState.go('previousState');
        });
      }
    }).
    state('app.users.logout', {
      url: '/logout',
      templateUrl: 'app/components/users/logout.html.tmpl',
      controller: 'usersLogoutCtrl'
    }).
    state('app.users.signup', {
      url: '/signup',
      templateUrl: 'app/components/users/signup.html.tmpl',
      controller: 'usersSignUpCtrl'
    });
});
