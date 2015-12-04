var app = require('angular').module('app');
var userSchema = require('models/userSchema');

app.controller('userProfileCtrl', function($log, $scope, $state, UserService) {

  'use strict';

  $scope.user = {};

  UserService.whoAmI(function(user) {
    $scope.user.details = mongoose.Document(user, userSchema);
  });

  $scope.user.update = function() {
    $log.debug('Updating details for user with id=' + $scope.user.details._id);
    $scope.user.details.validate(function(err) {
      if (err) {
        $log.debug('Validation error when updating user', err.errors);
        return;
      }
      var data = {};
      $scope.user.details.displayFields().forEach(function(key) {
        data[key] = $scope.user.details[key];
      });
      UserService.update({update: data});
      $state.go('app.home');
    });
  };

});
