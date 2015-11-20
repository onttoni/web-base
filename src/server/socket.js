var fs = require('fs');
var path = require('path');
var log = require('./logger');

module.exports = function(server, session) {

  var socketIo = require('socket.io')(server);

  socketIo.use(function(socket, next) {
    session(socket.request, {}, next);
  });

  var io = socketIo.listen(server);

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

  io.on('connection', function(socket) {
    var sckDir = path.join(__dirname, 'sockets');
    log.debug('Scanning', sckDir, 'for socket event handlers.');
    fs.readdirSync(sckDir).forEach(function(file) {
      if (path.extname(file) == '.js') {
        log.debug('Found', file);
        require(path.join(sckDir, file)).events(socket);
      }
    });
  });

  return io;
};
