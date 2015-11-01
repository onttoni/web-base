var log = require('./logger');
var mongoose = require('mongoose');
var dbUri = 'mongodb://nodeusr:nodepw@mongo01.local:27017/people';

function connect() {
  log.info('Connecting MongoDB:', dbUri);
  mongoose.connect(dbUri, function(err) {
    if (err) {
      log.fatal('MongoDB connection failed', err);
      log.fatal('Bailing out');
      process.exit(1);
    } else {
      log.info('MongoDB connected');
    }
  });
}

module.exports.connect = connect;
