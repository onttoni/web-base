var path = require('path');

cfg = {};
module.exports = cfg;

cfg.express = {};
cfg.express.httpPort = 8080;
cfg.express.key = path.join(__dirname, 'ssl/key.pem');
cfg.express.cert = path.join(__dirname, 'ssl/cert.pem');

cfg.expressSession = {};
cfg.expressSession.secret = 'foobar';

cfg.jsonwebtoken = {};
cfg.jsonwebtoken.secret = 'foobar';
cfg.jsonwebtoken.expires = 60 * 24;

cfg.mongo = {};
cfg.mongo.host = 'mongo01.local';
cfg.mongo.port = 27017;
cfg.mongo.db = 'people';
cfg.mongo.user = 'nodeusr';
cfg.mongo.password = 'nodepw';

cfg.logger = {};
cfg.logger.level = 'debug';
