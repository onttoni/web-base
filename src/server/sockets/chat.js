var moment = require('moment');
var log = require('../logger');
var User = require('../models/user');

module.exports.events = function(socket) {

  'use strict';

  function findUser(userId, callback) {
    User.findOne({_id: userId}, callback);
  }

  function getOutput(user, msg) {
    return {
      time: moment(),
      userEmail: user.email,
      msg: msg
    };
  }

  socket.on('chat:join', function() {
    findUser(socket.request.session.passport.user,
      function(err, user) {
        if (user) {
          var output = getOutput(user, 'joined');
          socket.emit('chat:hello', output);
          socket.broadcast.emit('chat:say', output);
        }
      });
  });

  socket.on('chat:msg', function(data) {
    findUser(socket.request.session.passport.user,
      function(err, user) {
        if (user) {
          var output = getOutput(user, data);
          socket.emit('chat:say', output);
          socket.broadcast.emit('chat:say', output);
        }
      });
  });

  socket.on('chat:leave', function() {
    findUser(socket.request.session.passport.user,
      function(err, user) {
        if (user) {
          var output = getOutput(user, 'left');
          socket.emit('chat:bye', output);
          socket.broadcast.emit('chat:say', output);
        }
      });
  });

};
