var app = require('angular').module('app');

app.controller('chatCtrl', function($log, $scope, $state, SocketService) {

  'use strict';

  $scope.chat = {};
  $scope.chat.output = [];

  SocketService.emit('chat:connect');

  SocketService.on('chat:hello', function(data) {
    $scope.$apply(function() {
      $scope.chat.output.push(data);
    });
  });

  SocketService.on('chat:bye', function(data) {
    $scope.$apply(function() {
      $scope.chat.output.push(data);
    });
  });

  SocketService.on('chat:say', function(data) {
    $scope.$apply(function() {
      $scope.chat.output.push(data);
    });
  });

  $scope.chat.send = function() {
    SocketService.emit('chat:msg', $scope.chat.input);
    $scope.chat.input = '';
  };

  $scope.$on('$destroy', function() {
    SocketService.emit('chat:disconnect');
  });

});
