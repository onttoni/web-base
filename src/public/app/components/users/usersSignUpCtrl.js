var app = require('angular').module('app');

app.controller('usersSignUpCtrl', function($log, $scope, User) {

  'use strict';

  $scope.users = {};
  $scope.users.added = new User();

  $scope.users.signUp = function() {
    $log.debug('New user is signing up', $scope.users.added);
    $scope.users.added.$signUp(function(newUser) {
      $log.debug('New user is', newUser);

    });
  };

});
