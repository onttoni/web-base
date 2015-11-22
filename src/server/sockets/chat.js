var moment = require('moment');
var log = require('../logger');
var User = require('../models/user');

module.exports.events = function(socket) {

  'use strict';

  function findUser(userId, callback) {
    User.findOne({_id: userId}, callback);
  }

  function socketEmitBroadcast(event, data) {
    socket.emit(event, data);
    socket.broadcast.emit(event, data);
  }

  socket.on('chat:join', function() {
    findUser(socket.request.session.passport.user,
      function(err, user) {
        if (user) {
          var hello = moment().format('HH:mm:ss') + ' ' + user.email + ' joined';
          socketEmitBroadcast('chat:hello', hello);
        }
      });
  });

  socket.on('chat:msg', function(data) {
    findUser(socket.request.session.passport.user,
      function(err, user) {
        if (user) {
          var msg = moment().format('HH:mm:ss') + ' ' + user.email + ' ' + data;
          socketEmitBroadcast('chat:say', msg);
        }
      });
  });

  socket.on('chat:leave', function() {
    findUser(socket.request.session.passport.user,
      function(err, user) {
        if (user) {
          var bye = moment().format('HH:mm:ss') + ' ' + user.email + ' left';
          socketEmitBroadcast('chat:bye', bye);
        }
      });
  });

};
