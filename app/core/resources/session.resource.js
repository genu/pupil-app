'use strict';

angular.module('app.core')
  .service('Session', function (DS) {
    return DS.defineResource({
      name: 'session',
      relations: {
        hasOne: {
          profile: [{
            localField: 'student',
            localKey: 'student_id'
          }, {
            localField: 'tutor',
            localKey: 'tutor_id'
          }],
          location: {
            localField: 'location',
            localKey: 'location_id'
          },
          course: {
            localField: 'course',
            localKey: 'course_id'
          }
        }
      },
      afterCreate: function (resource, attrs, cb) {
        attrs.student_id = attrs.student_id[0];
        attrs.location_id = attrs.location_id[0];
        attrs.course_id = attrs.course_id[0];

        cb(null, attrs);
      },
      afterFind: function (resource, attrs, cb) {
        attrs.student_id = attrs.student_id[0];
        attrs.tutor_id = attrs.tutor_id[0];
        attrs.location_id = attrs.location_id[0];
        attrs.course_id = attrs.course_id[0];

        cb(null, attrs);
      },
      afterFindAll: function (resource, attrs, cb) {
        _.forEach(attrs, function (session) {
          session.student_id = attrs.student_id[0];
          session.tutor_id = attrs.tutor_id[0];
          session.location_id = attrs.location_id[0];
          session.course_id = attrs.course_id[0];
        });

        cb(null, attrs);
      },
      afterUpdate: function (resource, attrs, cb) {
        attrs.student_id = attrs.student_id[0];
        attrs.tutor_id = attrs.tutor_id[0];
        attrs.location_id = attrs.location_id[0];
        attrs.course_id = attrs.course_id[0];
      }
    })
  }).run(function (Session) {
});
