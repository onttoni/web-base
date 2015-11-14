var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true, min: 0, max: 100},
  address: {type: String, required: true},
});

module.exports = schema;
