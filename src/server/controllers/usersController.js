var _ = require('lodash');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports.controller = function(app, apiPrefix, passport) {

  var path = apiPrefix + 'users/';

  app.post(path, function(req, res, next) {
    if (req.query.login) {
      login(req, res, next, passport);
    } else if (req.query.signup) {
      signUp(req, res, next, passport);
    } else {
      return res.status(400).send({msg: 'bad request'});
    }
  });

  app.get(path, function(req, res) {
    if (req.query.logout) {
      req.logout();
      return res.status(200).send({msg: 'ok'});
    }
    User.findOne({
      _id: _.get(req, 'session.passport.user', null)
    },
    function(err, obj) {
      if (err) {
        return res.status(400).send({msg: 'bad request'});
      }
      if (!obj) {
        return res.status(404).send({msg: 'not found'});
      }
      return res.json(obj);
    });
  });

  app.put(path, function(req, res) {
    User.findOneAndUpdate({
      _id: _.get(req, 'session.passport.user', null)
    },
    req.body.update,
    {new: true, upsert: false},
    function(err, obj) {
      if (err) {
        return res.status(400).send({msg: 'bad request'});
      }
      if (!obj) {
        return res.status(404).send({msg: 'not found'});
      }
      return res.json(obj);
    });
  });

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send({msg: 'unauthorized'});
}

function login(req, res, next, passport) {
  passport.authenticate('local-login', function(err, user) {
    if (!user) {
      return res.status(404).send(err);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      var token = jwt.sign(user, require('../config').jsonwebtoken.secret, {
        expiresInMinutes: require('../config').jsonwebtoken.expires
      });
      return res.json({user: user, token: token});
    });
  })(req, res, next);
}

function signUp(req, res, next, passport) {
  passport.authenticate('local-signup', function(err, user) {
    if (!user) {
      return res.status(404).send(err);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      var token = jwt.sign(user, require('../config').jsonwebtoken.secret, {
        expiresInMinutes: require('../config').jsonwebtoken.expires
      });
      return res.json({user: user, token: token});
    });
  })(req, res, next);
}
