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
      return res.json(user);
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
      return res.json(user);
    });
  })(req, res, next);
}
