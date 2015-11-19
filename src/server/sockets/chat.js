var moment = require('moment');
var log = require('../logger');
var User = require('../models/user');

module.exports.listen = function(io) {

  'use strict';

  var chat = io.of('/chat');
  chat.on('connection', function(socket) {
    var timeFormat = 'HH:mm:ss';
    var user;
    User.findOne(
      {_id: socket.request.session.passport.user},
      function(err, obj) {
        if (obj) {
          user = obj;
          var hello = moment().format(timeFormat) + ' ' + user.email + ' joined';
          socket.emit('hello', hello);
          socket.broadcast.emit('hello', hello);
        }
      });

    socket.on('say', function(data) {
      var msg = moment().
        format(timeFormat) + ' ' + user.email + ' ' + data;
      socket.emit('msg', msg);
      socket.broadcast.emit('msg', msg);
    });
  });

  return io;
};
