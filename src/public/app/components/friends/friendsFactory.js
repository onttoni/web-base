define(['angular'], function(angular) {

  var friends = angular.module('friends');

  friends.factory('Friend', function($resource) {

    return $resource('/api/friends/:id', {id: '@_id'},
      {
        add: {method: 'POST'},
        update: {method: 'PUT'},
      }
    );

  });

});
