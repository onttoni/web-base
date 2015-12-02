var Friend = require('../models/friend');

module.exports.controller = function(app, apiPrefix) {

  var path = apiPrefix + 'friends/';

  app.get(path, function(req, res) {
    var user = req.session.passport.user;
    Friend.find({
      user: user
    },
    req.query.fields,
    function(err, obj) {
      if (err) {
        return res.status(500).send({msg: 'internal server error'});
      }
      return res.json(obj);
    });
  });

  app.get(path + ':id', function(req, res) {
    var user = req.session.passport.user;
    Friend.findOne({
      user: user,
      _id: req.params.id
    },
    req.query.fields,
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

  // Add friend
  app.post(path, function(req, res) {
    var friend = new Friend(req.body.add);
    friend.user = req.session.passport.user;
    friend.save(function(err) {
      if (err) {
        return res.status(400).send({msg: 'bad request'});
      }
      return res.json(friend);
    });
  });

  // Update friend
  app.put(path, function(req, res) {
    var user = req.session.passport.user;
    Friend.findOneAndUpdate({
      user: user,
      _id: req.body.id
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

  app.delete(path + ':id', function(req, res) {
    var user = req.session.passport.user;
    Friend.remove({
      user: user,
      _id: req.params.id
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
};
