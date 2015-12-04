var expressJwt = require('express-jwt');

module.exports.controller = function(app, apiPrefix) {

  app.all(apiPrefix + 'friends/', expressJwt({
    secret: require('../config').jsonwebtoken.secret
  }));

};
