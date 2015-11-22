var moment = require('moment');
var log = require('../logger');
var User = require('../models/user');

module.exports.events = function(socket) {

  'use strict';

  socket.on('chat:join', function() {
    User.findOne(
      {_id: socket.request.session.passport.user},
      function(err, user) {
        if (user) {
          var hello = moment().format('HH:mm:ss') + ' ' + user.email + ' joined';
          socket.emit('chat:hello', hello);
          socket.broadcast.emit('chat:hello', hello);
        }
      });
  });

  socket.on('chat:msg', function(data) {
    User.findOne(
      {_id: socket.request.session.passport.user},
      function(err, user) {
        if (user) {
          var msg = moment().format('HH:mm:ss') + ' ' + user.email + ' ' + data;
          socket.emit('chat:say', msg);
          socket.broadcast.emit('chat:say', msg);
        }
      });
  });

  socket.on('chat:leave', function() {
    User.findOne(
      {_id: socket.request.session.passport.user},
      function(err, user) {
        if (user) {
          var bye = moment().format('HH:mm:ss') + ' ' + user.email + ' left';
          socket.emit('chat:bye', bye);
          socket.broadcast.emit('chat:bye', bye);
        }
      });
  });

};
