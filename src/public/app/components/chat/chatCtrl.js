var app = require('angular').module('app');
var CBuffer = require('CBuffer');

app.controller('chatCtrl', function($log, $scope, $state, SocketService) {

  'use strict';

  var outputBufferLen = 50;
  var outputBuffer = null;

  $scope.chat = {};

  SocketService.emit('chat:join');

  $scope.chat.getMessages = function() {
    if (outputBuffer) {
      return outputBuffer.toArray();
    }
  };

  SocketService.on('chat:hello', function(data) {
    outputBuffer = new CBuffer(outputBufferLen);
    $scope.$apply(function() {
      outputBuffer.push(data);
    });
  });

  SocketService.on('chat:bye', function() {
    outputBuffer = null;
  });

  SocketService.on('chat:say', function(data) {
    $scope.$apply(function() {
      outputBuffer.push(data);
    });
  });

  $scope.chat.send = function() {
    SocketService.emit('chat:msg', $scope.chat.input);
    $scope.chat.input = '';
  };

  $scope.$on('$destroy', function() {
    SocketService.emit('chat:leave');
  });

});
