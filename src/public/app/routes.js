var app = require('angular').module('app');

app.config(function($routeProvider) {

    'use strict';

    $routeProvider.
    when('/', {
      templateUrl: 'app/components/comp1/testView.html.tmpl',
      controller: 'comp1Ctrl'
    }).
    when('/friends', {
      templateUrl: 'app/components/friends/friendsListView.html.tmpl',
      controller: 'friendsCtrl'
    }).
    when('/friends/:friendId', {
      templateUrl: 'app/components/friends/friendsDetailView.html.tmpl',
      controller: 'friendsCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
);
