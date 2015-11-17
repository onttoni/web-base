module.exports.controller = function(app, apiPrefix) {

  app.all(apiPrefix + 'friends/', requireAuthentication);

};

function requireAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send({msg: 'unauthorized'});
}
