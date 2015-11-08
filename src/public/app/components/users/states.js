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
          controller: function($scope, $log, User, $uibModalInstance) {
            // FIXME: Controller from a separate module.
            $scope.users = {};
            $scope.users.loggedIn = new User();
            $scope.users.login = function() {
              $log.debug('User is logging in', $scope.users.loggedIn);
              $scope.users.loggedIn.$login(
                function(user) {
                  $log.debug('user logged in', user);
                  $uibModalInstance.close();
                },
                function(err) {
                  $log.debug('login failed', err);
                });
            };
            $scope.users.cancel = function() {
              $uibModalInstance.close();
            };
          }
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
