var app = require('angular').module('app');

app.controller('usersLoginCtrl', function($log, $scope, $uibModalInstance, User) {

  'use strict';

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
});
