var app = require('angular').module('app');
var userSchema = require('models/userSchema');

app.controller('userSignUpCtrl', function($log, $scope, $state, UserService) {

  'use strict';

  $scope.user = {};
  $scope.user.added = mongoose.Document({}, userSchema);

  $scope.user.signUp = function() {
    $log.debug('New user is signing up', $scope.user.added);
    $scope.user.added.validate(function(err) {
      if (err) {
        $log.debug('Validation error when adding user', err.errors);
        return;
      }
      if ($scope.user.added.password != $scope.passwordVerify) {
        $log.debug('Passwords did not match');
        return;
      }
      var data = {};
      $scope.user.added.displayFields().forEach(function(key) {
        data[key] = $scope.user.added[key];
      });
      UserService.signUp(data, function() {
        $state.go('app.home');
      });
    });
  };
});
