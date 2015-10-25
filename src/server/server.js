var apiPrefix = '/api/';
var express = require('express');
var fs = require('fs');
var httpPort = 8080;
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var publicDir = path.join(__dirname, '../../build/public');
require('./db').connect();

// All middleware should be placed before routers.
console.log('Serving static files from: ' + publicDir);
app.use(express.static(publicDir));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(function (req, res, next) {
  // Custom middleware here.

  // console.log('Path', req.path);
  // console.log('Method', req.method);
  // console.log('Params', req.params);
  // console.log('Query', req.query);
  // console.log('Body', req.body);

  next();
});

// Dynamically include routes (Controllers).
fs.readdirSync('./src/server/controllers').forEach(function (file) {
  if (file.substr(-3) == '.js') {
    route = require('./controllers/' + file);
    //route = require(path.join('controllers', file));
    route.controller(app, apiPrefix);
  }
});

// The application is served from root.
app.get('/', function(req, res) {
  res.sendFile('app/index.html', { root: publicDir });
});

app.listen(httpPort);
console.log("App listening on port " + httpPort);
