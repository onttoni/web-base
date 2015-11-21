var app = require('angular').module('app');
var _ = require('lodash');

app.service('User', function($log, $resource) {

  var resource = $resource('/api/users/:id', {id: '@_id'},
  {
    signUp: {method: 'POST', params: {signup: true}},
    update: {method: 'PUT'},
    logout: {method: 'GET', params: {logout: true}},
    login: {method: 'POST', params: {login: true}}
  });

  this.signUp = function(data, callback, errorCallback) {
    resource.signUp(
      data,
      function(user) {
        $log.debug('sign up success', user);
        if (_.isFunction(callback)) {
          callback();
        }
      },
      function(err) {
        $log.debug('sign up failed', err);
        if (_.isFunction(errorCallback)) {
          errorCallback();
        }
      }
    );
  };

  this.update = function(data, callback, errorCallback) {
    resource.update(
      data,
      function(user) {
        $log.debug('user update success', user);
        if (_.isFunction(callback)) {
          callback();
        }
      },
      function(err) {
        $log.debug('user update failed', err);
        if (_.isFunction(errorCallback)) {
          errorCallback();
        }
      }
    );
  };

  this.logout = function(callback, errorCallback) {
    resource.logout(
      function(user) {
        $log.debug('sign out success', user);
        if (_.isFunction(callback)) {
          callback();
        }
      },
      function(err) {
        $log.debug('sign out failed', err);
        if (_.isFunction(errorCallback)) {
          errorCallback();
        }
      }
    );
  };

  this.login = function(data, callback, errorCallback) {
    resource.login(
      data,
      function(user) {
        $log.debug('sign in success', user);
        if (_.isFunction(callback)) {
          callback();
        }
      },
      function(err) {
        $log.debug('sign in failed', err);
        if (_.isFunction(errorCallback)) {
          errorCallback();
        }
      }
    );
  };
});
