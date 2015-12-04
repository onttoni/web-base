var expressJwt = require('express-jwt');

module.exports.controller = function(app, apiPrefix) {

  app.all(apiPrefix + 'friends/',
  expressJwt({
    secret: require('../config').jsonwebtoken.secret
  }),
  function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send({msg: 'unauthorized'});
    }
    next();
  });
};
