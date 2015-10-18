module.exports = function () {

  'use strict';

  var my_factory = {};

  my_factory.data = [];

  my_factory.add_data = function(person) {
    my_factory.data.push(person);
  };

  my_factory.get_data = function() {
    return my_factory.data;
  };
  
  return my_factory;

};
