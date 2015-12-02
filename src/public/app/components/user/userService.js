var app = require('angular').module('app');
var _ = require('lodash');

app.service('UserService', function($log, $resource, $rootScope) {

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
      function(loginResp) {
        setSignedIn(loginResp.user);
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
        $log.debug('user query returned', userObj);
        user = userObj;
        if (_.isFunction(callback)) {
          callback(userObj);
        }
      },
      function(err) {
        $log.debug('user query failed', err);
        user = null;
        if (_.isFunction(errorCallback)) {
          errorCallback();
        }
      }
    );
  }

  function setSignedIn(userObj) {
    $log.debug('sign in success', userObj);
    signedIn = true;
    user = userObj;
    $rootScope.$broadcast('user:signIn');
  }

  function unsetSignedIn() {
    $log.debug('sign out success');
    signedIn = false;
    user = null;
    $rootScope.$broadcast('user:signOut');
  }

  $rootScope.$on('socket:connected', function() {
    $log.debug('UserService <- socket:connected');
    signedIn = true;
    getUser();
  });

  $rootScope.$on('socket:disconnected', function() {
    $log.debug('UserService <- socket:disconnected');
    signedIn = false;
    user = null;
  });

});
