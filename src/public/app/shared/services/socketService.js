var app = require('angular').module('app');

app.service('SocketService', function() {
  var io = require('socket.io-client');
  var socket = io.connect(window.location.origin);

  this.on = function(eventName, callback) {
    socket.on(eventName, function() {
      var args = arguments;
      callback.apply(socket, args);
    });
  };

  this.emit = function(eventName, data, callback) {
    socket.emit(eventName, data, function() {
      var args = arguments;
      if (callback) {
        callback.apply(socket, args);
      }
    });
  };
});
