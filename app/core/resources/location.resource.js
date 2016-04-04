'use strict';

angular.module('app.core')
  .service('Location', function (DS) {
    return DS.defineResource({
      name: 'location',
      relations: {
        hasOne: {
          school: {
            localField: 'school',
            localKey: 'school_id'
          }
        }
      }
    })
  }).run(function (Location) {
});
