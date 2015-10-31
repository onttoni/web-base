var mongoose = require('mongoose');
var dbUri = 'mongodb://nodeusr:nodepw@mongo01.local:27017/people';

function connect() {
  console.log('Connecting MongoDB: ' + dbUri);
  mongoose.connect(dbUri, function(bad, good) {
    if (bad) {
      console.log('MongoDB connection failed ' + bad.message);
    } else {
      console.log('MongoDB connected');
    }
  });
}

module.exports.connect = connect;
