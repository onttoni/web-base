var app = require('angular').module('app');

app.config(function($stateProvider, $urlRouterProvider) {

  'use strict';

  $urlRouterProvider.otherwise('/');

  $stateProvider.

    state('app', {
      url: '',
      abstract: true,
      sticky: true,
      views: {
        'app': {
          templateUrl: 'app/shared/views/body.html.tmpl'
        },
        'header@app': {
          templateUrl: 'app/shared/views/header.html.tmpl'
        },
        'footer@app': {
          templateUrl: 'app/shared/views/footer.html.tmpl'
        }
      }
    }).
    state('app.home', {
      url: '/',
      templateUrl: 'app/components/home/homeView.html.tmpl',
      controller: 'homeCtrl'
    }).
    state('app.friends', {
      abstract: true,
      url: '/friends',
      template: '<ui-view></ui-view>'
    }).
    state('app.friends.list', {
      url: '/list',
      templateUrl: 'app/components/friends/friendsListView.html.tmpl',
      controller: 'friendsCtrl'
    }).
    state('app.friends.details', {
      url: '/details/:friendId',
      templateUrl: 'app/components/friends/friendsDetailView.html.tmpl',
      controller: 'friendsCtrl'
    }).
    state('app.users', {
      abstract: true,
      template: '<ui-view></ui-view>'
    }).
    state('app.users.login', {
      url: '/login',
      templateUrl: 'app/components/users/login.html.tmpl',
      controller: 'usersLoginCtrl'
    }).
    state('app.users.logout', {
      url: '/logout',
      templateUrl: 'app/components/users/logout.html.tmpl',
      controller: 'usersLogoutCtrl'
    }).
    state('app.users.signup', {
      url: '/signup',
      templateUrl: 'app/components/users/signup.html.tmpl',
      controller: 'usersSignUpCtrl'
    });
});
