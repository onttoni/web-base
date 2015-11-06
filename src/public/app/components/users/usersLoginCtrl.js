var app = require('angular').module('app');

app.controller('usersLoginCtrl', function($log, $scope, User) {

  'use strict';

  $scope.users = {};
  $scope.users.loggedIn = new User();

  $scope.users.login = function() {
    $log.debug('User is logging in', $scope.users.loggedIn);
    $scope.users.loggedIn.$login();
  };

});
