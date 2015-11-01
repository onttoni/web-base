var log = require('./logger');
var apiPrefix = '/api/';
var express = require('express');
var fs = require('fs');
var httpPort = 8080;
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var publicDir = path.join(__dirname, '../../build/public');
require('./db').connect();

// All middleware should be placed before routers.
log.info('Serving static files from:', publicDir);
app.use(express.static(publicDir));
app.use(require('express-bunyan-logger')({parseUA: false, format: ':method :url :status-code'}));
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
    route.controller(app, apiPrefix);
  }
});

// The application is served from root.
app.get('/', function(req, res) {
  res.sendFile('app/index.html', {root: publicDir});
});

app.listen(httpPort);
log.info('Server listening on port', httpPort);
