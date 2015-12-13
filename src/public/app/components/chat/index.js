define(['angular'], function(angular) {

  var chat = angular.module('chat', []);

  require('./chatCtrl');
  require('./states');

});
