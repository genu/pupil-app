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
      },
      afterFind: function (resource, attrs, cb) {
        attrs.school_id = attrs.school_id[0];

        cb(null, attrs);
      },
      afterFindAll: function (resource, attrs, cb) {
        // Convert all school references from arrays to single value
        _.forEach(attrs, function (instance) {
          instance.school_id = instance.school_id[0];
        });

        cb(null, attrs);
      },
      afterUpdate: function (resource, attrs, cb) {
        attrs.school_id = attrs.school_id[0];

        cb(null, attrs);
      }
    })
  }).run(function (Location) {
});
