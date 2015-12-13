define(['angular', 'shared/services'], function(angular) {

  var user = angular.module('user');
  var getPersonDoc = require('shared/utils/personUtils').getPersonDoc;
  var extractDocData = require('shared/utils/personUtils').extractDocData;

  user.controller('userProfileCtrl', function($log, $scope, $state, UserService) {

    'use strict';

    UserService.whoAmI(function(user) {
      getPersonDoc($scope, user, 'userSchema');
    });

    $scope.update = function() {
      $log.debug('Updating details for user with id=' + $scope.personDoc._id);
      $scope.personDoc.validate(function(err) {
        if (err) {
          $log.debug('Validation error when updating user', err.errors);
          return;
        }
        UserService.update({update: extractDocData($scope)});
        $state.go('app.home');
      });
    };

  });

});
