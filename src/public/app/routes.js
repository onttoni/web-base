var app = require('angular').module('app');

app.config(function($routeProvider) {

  'use strict';

  $routeProvider.
  when('/', {
    templateUrl: 'app/components/home/homeView.html.tmpl',
    controller: 'homeCtrl'
  }).
  when('/friends', {
    templateUrl: 'app/components/friends/friendsListView.html.tmpl',
    controller: 'friendsCtrl'
  }).
  when('/friends/:friendId', {
    templateUrl: 'app/components/friends/friendsDetailView.html.tmpl',
    controller: 'friendsCtrl'
  }).
  when('/login', {
    templateUrl: 'app/components/users/login.html.tmpl',
    controller: 'usersLoginCtrl'
  }).
  when('/logout', {
    templateUrl: 'app/components/users/logout.html.tmpl',
    controller: 'usersLogoutCtrl'
  }).
  when('/signup', {
    templateUrl: 'app/components/users/signup.html.tmpl',
    controller: 'usersSignUpCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
});
