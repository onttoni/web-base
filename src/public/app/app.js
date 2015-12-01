$ = jQuery = require('jquery');
require('bootstrap');
require('angular');
require('angular-resource');
require('angular-ui-bootstrap');
require('angular-ui-router');
require('angular-sanitize');
require('mongoose');
require('ui-router-extras');

var appDeps = ['ct.ui.router.extras', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'ui.router'];
var app = angular.module('app', appDeps);

require('./config');
require('../js/jquery_parts');
require('./shared');
require('./components/about');
require('./components/chat');
require('./components/home');
require('./components/friends');
require('./components/user');
require('./states');
