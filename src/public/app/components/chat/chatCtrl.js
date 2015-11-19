var app = require('angular').module('app');
var io = require('socket.io-client');

app.controller('chatCtrl', function($log, $scope, $state) {

  'use strict';

  $scope.chat = {};
  $scope.chat.output = [];

  var socket = io.connect('http://localhost:8080/chat');
  socket.on('hello', function(data) {
    $log.debug('socket:chat connected');
    $scope.$apply(function() {
      $scope.chat.output.push(data);
    });
  });

  socket.on('msg', function(data) {
    $log.debug('socket:chat new message:', data);
    $scope.$apply(function() {
      $scope.chat.output.push(data);
    });
  });

  $scope.chat.send = function() {
    socket.emit('say', $scope.chat.input);
    $scope.chat.input = '';
  };

});
