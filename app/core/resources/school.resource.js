'use strict';

angular.module('app.core')
  .service('School', function (DS) {
    return DS.defineResource({
      name: 'school'
    });
  }).run(function (School) {
});
