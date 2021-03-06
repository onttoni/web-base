var fs = require('fs');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var log = require('./logger');
var jwtPrivate = 'foobar';
var jwtPublic = 'foobar';
var keys = false;
const jwtExpiresIn = require('./config').jsonwebtoken.expiresIn;

readKeys();

module.exports = {

  getPublicKey: function() {
    return jwtPublic;
  },
  getUserId: function(req, callback) {
    var token = getToken(req);
    var verifyAttrs;
    if (keys) {
      verifyAttrs = [token, jwtPublic, {algorithms: ['RS256']}];
    } else {
      verifyAttrs = [token, jwtPublic];
    }
    function verifyCallback(err, decoded) {
      var id = _.get(decoded, '_id', null);
      if (id && !err) {
        log.debug('token was used for auth');
        callback(id);
      } else {
        log.debug('session was used for auth');
        callback(_.get(req, 'session.passport.user', null));
      }
    }
    verifyAttrs.push(verifyCallback);
    jwt.verify.apply(this, verifyAttrs);
  },
  signUserToken: function(user) {
    var signAttrs;
    if (keys) {
      signAttrs = {algorithm: 'RS256', expiresIn: jwtExpiresIn};
    } else {
      signAttrs = {expiresIn: jwtExpiresIn};
    }
    return jwt.sign(user, jwtPrivate, signAttrs);
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

function readKeys() {
  try {
    jwtPrivate = fs.readFileSync(require('./config').jsonwebtoken.private);
    jwtPublic = fs.readFileSync(require('./config').jsonwebtoken.public);
    log.info('Server is using keys for tokens');
    keys = true;
  } catch (err) {
    log.warn('Server is using nonsecrets for tokens', err);
  }
}
