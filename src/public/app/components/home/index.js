define(['angular'], function(angular) {

  var home = angular.module('home', []);

  require('./homeCtrl');
  require('./comp1Factory');
  require('./states');

});
