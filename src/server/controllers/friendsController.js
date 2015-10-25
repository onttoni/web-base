var Friend = require('../models/friend');


module.exports.controller = function(app, apiPrefix, ngBrd) {

  var path = apiPrefix + 'friends/';

  app.get(path + 'schema', function(req, res) {
    res.json(Friend.schema.paths);
  });

  app.get(path, function(req, res) {
    Friend.find({
    },
    req.query.fields,
    function(err, obj) {
      if (err)
        res.send(err)
      res.json(obj);
    });
  });

  app.get(path + ':id', function(req, res) {
    Friend.findOne({
      _id: req.params.id
    },
    req.query.fields,
    function(err, obj) {
      if (err)
        res.send(err)
      res.json(obj);
    });
  });

  // Add friend
  app.post(path, function(req, res) {
    var friend = new Friend({
      name: req.body.name,
      age: req.body.age,
      address: req.body.address
    });
    friend.save(function(err, obj) {
      if (err)
        return res.send(err);
      res.json(friend);
    });
  });

  // Update friend
  app.put(path, function(req, res) {
    Friend.findOneAndUpdate({
      _id: req.body.id
    },
    req.body.update,
    { upsert: false },
    function(err, obj) {
      if (err)
        res.send(err)
      res.json(obj);
    });
  });

  app.delete(path + ':id', function(req, res) {
    Friend.remove({
      _id : req.params.id
    },
    function(err, obj) {
      if (err)
        res.send(err);
      res.json(obj);
    });
  });
}
