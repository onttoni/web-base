var app = require('angular').module('app');

app.controller('usersLoginCtrl', function($log, $scope, $uibModalInstance, User) {

  'use strict';

  $scope.users = {};
  $scope.users.loggedIn = new User();

  $scope.users.login = function() {
    $scope.users.loggedIn.$login(
      function() {
        $log.debug('User login success', $scope.users.loggedIn);
        $uibModalInstance.close('loginSuccess');
      },
      function() {
        $log.debug('User login failed', $scope.users.loggedIn);
      });
  };

  $scope.users.cancel = function() {
    $uibModalInstance.close('loginCancelled');
  };

  $scope.users.signUp = function() {
    $uibModalInstance.close('signUp');
  };

});
