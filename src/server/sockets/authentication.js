module.exports.listen = function(io) {

  'use strict';

  io.use(function(socket, next) {
    var userId;
    try {
      userId = socket.request.session.passport.user;
    } catch (err) {}
    if (userId) {
      return next();
    }
    return next(new Error('Authentication error'));
  });
};
