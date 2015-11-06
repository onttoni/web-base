var app = require('angular').module('app');

app.config(function($stateProvider, $urlRouterProvider) {

  'use strict';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/components/home/homeView.html.tmpl',
      controller: 'homeCtrl'
    }).
    state('friends', {
      abstract: true,
      url: '/friends',
      template: '<ui-view></ui-view>'
    }).
    state('friends.list', {
      url: '/list',
      templateUrl: 'app/components/friends/friendsListView.html.tmpl',
      controller: 'friendsCtrl'
    }).
    state('friends.details', {
      url: '/details/:friendId',
      templateUrl: 'app/components/friends/friendsDetailView.html.tmpl',
      controller: 'friendsCtrl'
    }).
    state('users', {
      abstract: true,
      template: '<ui-view></ui-view>'
    }).
    state('users.login', {
      url: '/login',
      templateUrl: 'app/components/users/login.html.tmpl',
      controller: 'usersLoginCtrl'
    }).
    state('users.logout', {
      url: '/logout',
      templateUrl: 'app/components/users/logout.html.tmpl',
      controller: 'usersLogoutCtrl'
    }).
    state('users.signup', {
      url: '/signup',
      templateUrl: 'app/components/users/signup.html.tmpl',
      controller: 'usersSignUpCtrl'
    });
});
