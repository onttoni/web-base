var app = require('angular').module('app');
var io = require('socket.io-client');

app.controller('chatCtrl', function($log, $scope, $state) {

  'use strict';

  var socket = io.connect('http://localhost');
  socket.on('news', function(data) {
    console.log(data);
    socket.emit('my other event', {my: 'data'});
  });

});
