var _ = require('lodash');
var log = require('./logger');
var jwt = require('jsonwebtoken');
const jwtSecret = require('./config').jsonwebtoken.secret;
const jwtExpiresInMinutes = require('./config').jsonwebtoken.expiresInMinutes;

module.exports = {

  getUserId: function(req, callback) {
    var token = getToken(req);
    jwt.verify(token, jwtSecret, function(err, decoded) {
      var id = _.get(decoded, '_id', null);
      if (id && !err) {
        log.debug('token was used for auth');
        callback(id);
      } else {
        log.debug('session was used for auth');
        callback(_.get(req, 'session.passport.user', null));
      }
    });
  },
  signUserToken: function(user) {
    return jwt.sign(user, jwtSecret, {
      expiresInMinutes: jwtExpiresInMinutes
    });
  }
};

function getToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}
