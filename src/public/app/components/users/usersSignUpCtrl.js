var app = require('angular').module('app');
var userSchema = require('models/userSchema');

app.controller('usersSignUpCtrl', function($log, $scope, $state, User) {

  'use strict';

  $scope.users = {};
  $scope.users.added = mongoose.Document({}, userSchema);

  $scope.users.signUp = function() {
    $log.debug('New user is signing up', $scope.users.added);
    $scope.users.added.validate(function(err) {
      if (err) {
        $log.debug('Validation error when adding user', err.errors);
        return;
      }
      var data = {};
      $scope.users.added.displayFields().forEach(function(key) {
        data[key] = $scope.users.added[key];
      });
      new User(data).$signUp(function(newUser) {
        $log.debug('New user is', newUser);
        $state.go('app.home');
      });
    });
  };
});
