var app = require('angular').module('app');
var _ = require('lodash');

app.service('SocketService', function($log, $rootScope, $window) {

  'use strict';

  var io = require('socket.io-client');
  var socket = null;
  var connectionOptions =  {
    'forceNew': true,
    'reconnection': true,
    'reconnectionDelay': 2000,
    'reconnectionDelayMax': 60000,
    'reconnectionAttempts': 'Infinity',
    'timeout': 10000
  };

  connect();

  this.connect = function() {
    connect();
  };

  this.disconnect = function() {
    disconnect();
  };

  this.isConnected = function() {
    return _.get(socket, 'connected', false);
  };

  this.emit = function(eventName, data, callback) {
    if (!socket) {
      return;
    }
    socket.emit(eventName, data, function() {
      var args = arguments;
      if (callback) {
        callback.apply(socket, args);
      }
    });
  };

  this.on = function(eventName, callback) {
    if (!socket) {
      return;
    }
    socket.on(eventName, function() {
      var args = arguments;
      callback.apply(socket, args);
    });
  };

  function connect() {
    if (!socket) {
      $log.debug('SocketService connecting');
      socket = io.connect(window.location.origin, connectionOptions);
      socket.on('connect', function() {
        socket.on('authenticated', function() {
          $log.debug('SocketService connected');
          $rootScope.$broadcast('socket:connected');
        }).emit('authenticate', {token: $window.localStorage.token});
      });
    }
  }

  function disconnect() {
    if (socket) {
      $log.debug('SocketService disconnecting');
      $rootScope.$broadcast('socket:disconnected');
      socket.disconnect();
      socket = null;
    }
  }

  $rootScope.$on('user:signIn', function() {
    $log.debug('SocketService <- user:signIn');
    connect();
  });

  $rootScope.$on('user:signOut', function() {
    $log.debug('SocketService <- user:signOut');
    disconnect();
  });

});
