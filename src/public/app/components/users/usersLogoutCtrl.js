var app = require('angular').module('app');

app.controller('usersLogoutCtrl', function($log, $scope, User) {

  'use strict';

  $scope.users = {};

  $scope.users.logout = function() {
    $log.debug('User is logging out');
    User.logout();
  };

});
