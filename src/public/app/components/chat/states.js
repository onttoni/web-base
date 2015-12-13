define(['angular'], function(angular) {

  var app = angular.module('app');

  app.config(function($stateProvider) {

    'use strict';

    $stateProvider.
    state('app.chat', {
      url: '/chat',
      templateUrl: 'app/components/chat/chatView.html.tmpl',
      controller: 'chatCtrl'
    });

  });

});
