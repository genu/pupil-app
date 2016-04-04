'use strict';

angular.module('app.core')
  .service('Course', function (DS) {
    return DS.defineResource({
      name: 'course'
    })
  }).run(function (Course) {
});
