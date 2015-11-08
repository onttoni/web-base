var app = require('angular').module('app');

app.config(function($locationProvider, $logProvider, $stickyStateProvider) {

  $logProvider.debugEnabled(true);
  $stickyStateProvider.enableDebug(true);
  $locationProvider.html5Mode(true);

});
