var app = require('angular').module('app');

app.controller('userLoginCtrl', function($log, $scope, $uibModalInstance, UserService) {

  'use strict';

  $scope.user = {};
  $scope.user.loggedIn = {};

  $scope.user.login = function() {
    UserService.login($scope.user.loggedIn,
      function() {
        $uibModalInstance.close('loginSuccess');
      });
  };

  $scope.user.cancel = function() {
    $uibModalInstance.close('loginCancelled');
  };

  $scope.user.signUp = function() {
    $uibModalInstance.close('signUp');
  };

});
