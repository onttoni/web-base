define(['angular'], function(angular) {

  var home = angular.module('home');

  home.factory('comp1Factory', function() {

    'use strict';

    var myFactory = {};

    myFactory.data = [];

    myFactory.addData = function(person) {
      myFactory.data.push(person);
    };

    myFactory.getData = function() {
      return myFactory.data;
    };

    return myFactory;

  });

});
