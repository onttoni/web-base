// @ngInject
module.exports = function ($resource) {

  return $resource("/api/friends/:id", { id: "@_id" },
    {
      'add':  { method: 'POST' },
      'update':  { method: 'PUT' },
    }
  );

};
