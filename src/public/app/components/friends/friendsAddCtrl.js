var app = require('angular').module('app');
var getPersonDoc = require('../../shared/utils/personUtils').getPersonDoc;
var extractDocData = require('../../shared/utils/personUtils').extractDocData;

app.controller('friendsAddCtrl', function($log, $scope, $state, Friend) {

  'use strict';

  getPersonDoc($scope, {}, 'friendSchema');

  $scope.save = function() {
    $log.debug('Adding friend', $scope.friendDoc);
    $scope.personDoc.validate(function(err) {
      if (err) {
        $log.debug('Validation error when adding friend', err.errors);
        return;
      }
      new Friend({add: extractDocData($scope)}).$save(function(newFriend) {
        $log.debug('New friend is', newFriend);
      });
      $state.go('app.friends.list');
    });
  };

});
