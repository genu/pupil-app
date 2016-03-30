'use strict';

angular.module('app.profile')
  .service('Profile', function (DS) {
    return DS.defineResource({
      name: 'profile',
      afterFind: function (resource, attrs, cb) {
        attrs.school_id = attrs.school_id[0];

        cb(null, attrs);
      },
      relations: {
        hasOne: {
          school: {
            localField: 'school',
            localKey: 'school_id'
          },
          user: {
            localField: 'user',
            localKey: 'user_id'
          }
        }
      }
    });
  }).run(function (Profile) {
});

