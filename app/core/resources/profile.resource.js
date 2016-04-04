'use strict';

angular.module('app.core')
  .service('Profile', function (DS, DSStamplayAdapter) {
    return DS.defineResource({
      name: 'profile',
      afterFind: function (resource, attrs, cb) {
        attrs.school_id = attrs.school_id[0];

        cb(null, attrs);
      },
      afterUpdate: function (resource, attrs, cb) {
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
      updateProfilePicture: function (file) {
        return DSStamplayAdapter.uploadFile(this, {profile_image: file});
      },
      getCard: function (user) {
        return DSStamplayAdapter.getCreditCard(user);
      },
      relations: {
        hasOne: {
          school: {
            localField: 'school',
            localKey: 'school_id'
          }
          ,
          user: {
            localField: 'user',
            localKey: 'user_id'
          }
        }
      },
      computed: {
        fullName: ['first_name', 'last_name', function (first_name, last_name) {
          return first_name + ' ' + last_name;
        }]
      }
    })
      ;
  }).run(function (Profile) {
});

