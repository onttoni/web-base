var app = require('angular').module('app');

app.controller('friendsAddCtrl', function($scope, $log, Friend) {

  'use strict';

  $scope.friends = {};

  Friend.get({id: 'schema'}, function(schema) {
    $scope.friends.schema = [];
    schema = schema.toJSON();
    Object.getOwnPropertyNames(schema).forEach(function(key) {
      if (key[0] !== '_') {
        $scope.friends.schema[key] = schema[key].instance;
      }});
    $log.debug('Friend schema is', $scope.friends.schema);
    $scope.friends.added = new Friend($scope.friends.schema);
  });

  $scope.friends.save = function() {
    $log.debug('Adding friend');
    $scope.friends.added.$save(function(newFriend) {
      $log.debug('New friend is', newFriend);
    });
  };

});
