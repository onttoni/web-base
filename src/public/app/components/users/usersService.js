var app = require('angular').module('app');
var _ = require('lodash');

app.service('User', function($log, $resource, $rootScope) {

  var signedIn = false;

  var resource = $resource('/api/users/:id', {id: '@_id'},
  {
    signUp: {method: 'POST', params: {signup: true}},
    update: {method: 'PUT'},
    logout: {method: 'GET', params: {logout: true}},
    login: {method: 'POST', params: {login: true}}
  });

  this.isSignedIn = function() {
    return signedIn === true;
  };

  this.signUp = function(data, callback, errorCallback) {
    resource.signUp(
      data,
      function(user) {
        setSignedIn(user);
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
      function() {
        unsetSignedIn();
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
        setSignedIn(user);
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

  function setSignedIn(user) {
    $log.debug('sign in success', user);
    signedIn = true;
    $rootScope.$broadcast('user:signIn');
  }

  function unsetSignedIn() {
    $log.debug('sign out success');
    signedIn = false;
    $rootScope.$broadcast('user:signOut');
  }

});
