var app = require('angular').module('app');
var _ = require('lodash');

app.service('UserService', function($log, $resource, $rootScope, $window) {

  var user = null;
  var signedIn = false;

  var resource = $resource('/api/users/:id', {id: '@_id'},
  {
    signUp: {method: 'POST', params: {signup: true}},
    update: {method: 'PUT'},
    logout: {method: 'GET', params: {logout: true}},
    login: {method: 'POST', params: {login: true}},
    getUser: {method: 'GET'}
  });

  this.isSignedIn = function() {
    return signedIn === true;
  };

  this.signUp = function(data, callback, errorCallback) {
    resource.signUp(
      data,
      function(signUpResp) {
        setSignedIn(signUpResp);
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
        setSignedIn({user: user});
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
    unsetSignedIn();
    resource.logout(
      function() {
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
      function(loginResp) {
        setSignedIn(loginResp);
        if (_.isFunction(callback)) {
          callback();
        }
      },
      function(err) {
        $log.debug('sign in failed', err);
        unsetSignedIn();
        if (_.isFunction(errorCallback)) {
          errorCallback();
        }
      }
    );
  };

  this.whoAmI = getUser;

  function getUser(callback, errorCallback) {
    if (user !== null) {
      if (_.isFunction(callback)) {
        callback(user);
      }
      return;
    }
    resource.getUser(
      function(userObj) {
        setSignedIn({user: userObj});
        if (_.isFunction(callback)) {
          callback(userObj);
        }
      },
      function(err) {
        $log.debug('user query failed', err);
        unsetSignedIn();
        if (_.isFunction(errorCallback)) {
          errorCallback();
        }
      }
    );
  }

  function setSignedIn(signInData) {
    $log.debug('sign in for user', signInData.user);
    signedIn = true;
    user = signInData.user;
    if (signInData.token) {
      $log.debug('user got token', signInData.token);
      $window.localStorage.token = signInData.token;
    }
    $rootScope.$broadcast('user:signIn');
  }

  function unsetSignedIn() {
    $log.debug('user sign out');
    signedIn = false;
    user = null;
    delete $window.localStorage.token;
    $rootScope.$broadcast('user:signOut');
  }
});
