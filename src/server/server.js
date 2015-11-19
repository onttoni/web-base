var log = require('./logger');
var apiPrefix = '/api/';
var express = require('express');
var fs = require('fs');
var httpPort = require('./config').express.httpPort;
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var path = require('path');
var publicDir = path.join(__dirname, '../../build/public');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var mongooseConnection = require('./db').connect();
var passport = require('passport');
var socketIo = require('socket.io')(server);

var session = expressSession({
  secret: 'foobar',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongooseConnection,
    touchAfter: 24 * 3600})
});
socketIo.use(function(socket, next) {
  session(socket.request, {}, next);
});
var io = socketIo.listen(server);
require('./passport')(passport);

// All middleware should be placed before routers.
log.info('Serving static files from:', publicDir);
app.use(express.static(publicDir));
app.use(require('express-bunyan-logger')({
  parseUA: false,
  format: ':method :url :status-code'}));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(require('method-override')());
app.use(function(req, res, next) {
  // Custom middleware here.

  // console.log('Path', req.path);
  // console.log('Method', req.method);
  // console.log('Params', req.params);
  // console.log('Query', req.query);
  // console.log('Body', req.body);

  next();
});

// Dynamically include routes (Controllers).
var ctrlDir = path.join(__dirname, 'controllers');
log.debug('Scanning', ctrlDir, 'for controllers.');
fs.readdirSync(ctrlDir).forEach(function(file) {
  if (path.extname(file) == '.js') {
    log.debug('Found', file);
    route = require(path.join(ctrlDir, file));
    route.controller(app, apiPrefix, passport);
  }
});

// Dynamically include sockets.
var sckDir = path.join(__dirname, 'sockets');
log.debug('Scanning', sckDir, 'for sockets.');
fs.readdirSync(sckDir).forEach(function(file) {
  if (path.extname(file) == '.js') {
    log.debug('Found', file);
    socket = require(path.join(sckDir, file));
    socket.listen(io);
  }
});

// The application is served from root.
app.get('*', function(req, res) {
  res.sendFile('app/index.html', {root: publicDir});
});

server.listen(httpPort);
log.info('Server listening on port', httpPort);
