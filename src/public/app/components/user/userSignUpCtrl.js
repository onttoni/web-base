define(['angular', 'shared/services'], function(angular) {

  var user = angular.module('user');
  var getPersonDoc = require('shared/utils/personUtils').getPersonDoc;
  var extractDocData = require('shared/utils/personUtils').extractDocData;

  user.controller('userSignUpCtrl', function($log, $scope, $state, UserService) {

    'use strict';

    $scope.passwordVerify = null;
    getPersonDoc($scope, {}, 'userSchema');

    $scope.signUp = function() {
      $log.debug('New user is signing up', $scope.personDoc);
      $scope.personDoc.validate(function(err) {
        if (err) {
          $log.debug('Validation error when adding user', err.errors);
          return;
        }
        if ($scope.personDoc.password != $scope.passwordVerify) {
          $log.debug('Passwords did not match');
          return;
        }
        UserService.signUp(extractDocData($scope), function() {
          $state.go('app.home');
        });
      });
    };
  });

});
