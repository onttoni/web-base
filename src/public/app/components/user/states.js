var app = require('angular').module('app');

app.config(function($stateProvider) {

  'use strict';

  var previousState;

  $stateProvider.
    state('app.user', {
      abstract: true,
      template: '<ui-view></ui-view>'
    }).
    state('app.user.login', {
      url: '/login',
      onEnter: function($stateParams, $state, $previousState, $uibModal) {
        previousState = $previousState.memo('previousState');
        $uibModal.open({
          templateUrl: 'app/components/user/login.html.tmpl',
          controller: 'userLoginCtrl'
        }).result.then(function(loginStatus) {
          switch (loginStatus) {
            case 'loginSuccess':
              $previousState.go('previousState');
              break;
            case 'loginCancelled':
              $state.go('app.home');
              break;
            case 'signUp':
              $state.go('app.user.signup');
              break;
          }
        });
      }
    }).
    state('app.user.logout', {
      url: '/logout',
      templateUrl: 'app/components/user/logout.html.tmpl',
      controller: 'userLogoutCtrl'
    }).
    state('app.user.signup', {
      url: '/signup',
      templateUrl: 'app/components/user/signup.html.tmpl',
      controller: 'userSignUpCtrl'
    });
});