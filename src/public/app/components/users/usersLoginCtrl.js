var app = require('angular').module('app');

app.controller('usersLoginCtrl', function($log, $scope, $uibModalInstance, User) {

  'use strict';

  $scope.users = {};
  $scope.users.loggedIn = {};

  $scope.users.login = function() {
    User.login($scope.users.loggedIn,
      function() {
        $uibModalInstance.close('loginSuccess');
      });
  };

  $scope.users.cancel = function() {
    $uibModalInstance.close('loginCancelled');
  };

  $scope.users.signUp = function() {
    $uibModalInstance.close('signUp');
  };

});
