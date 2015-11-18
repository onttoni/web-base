var app = require('angular').module('app');

app.config(function($stateProvider) {

  'use strict';

  $stateProvider.
  state('app.chat', {
    abstract: true,
    url: '/chat',
    template: '<ui-view></ui-view>'
  }).
  state('app.chat.list', {
    url: '/list',
    templateUrl: 'app/components/chat/chatView.html.tmpl',
    controller: 'chatCtrl'
  });

});
