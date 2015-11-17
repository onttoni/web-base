var app = require('angular').module('app');
require('./http401');

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('http401Interceptor');
});
