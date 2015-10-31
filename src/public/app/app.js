$ = jQuery = require('jquery');
require('bootstrap');
require('angular');
require('angular-modal-service');
require('angular-resource');
require('angular-route');
require('angular-sanitize');

var appDeps = ['angularModalService', 'ngResource', 'ngRoute', 'ngSanitize'];
var app = angular.module('app', appDeps);

require('./config');
require('../js/jquery_parts');
require('./shared');
require('./components/about');
require('./components/comp1');
require('./components/friends');
require('./routes');
