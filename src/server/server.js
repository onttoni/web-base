var log = require('./logger');
var express = require('express');
var fs = require('fs');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var path = require('path');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var mongooseConnection = require('./db').connect();
var passport = require('passport');
const apiPrefix = '/api/';
const httpPort = require('./config').express.httpPort;
const publicDir = path.join(__dirname, '../../build/public');

var session = expressSession({
  secret: 'foobar',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongooseConnection,
    touchAfter: 24 * 3600})
});

var io = require('./socket')(server, session);
require('./passport')(passport);

// All middleware should be placed before routes.
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

// Include routes
var ctrlDir = path.join(__dirname, 'controllers');
log.debug('Scanning', ctrlDir, 'for controllers.');
fs.readdirSync(ctrlDir).forEach(function(file) {
  if (path.extname(file) == '.js') {
    log.debug('Found', file);
    route = require(path.join(ctrlDir, file));
    route.controller(app, apiPrefix, passport);
  }
});

app.get('*', function(req, res) {
  res.sendFile('app/index.html', {root: publicDir});
});

server.listen(httpPort);
log.info('Server listening on port', httpPort);
