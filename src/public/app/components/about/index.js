define(['angular', 'angular-ui-bootstrap'], function(angular) {

  var about = angular.module('about', []);

  require('./aboutCtrl');
  require('./states');

  return about;

});
