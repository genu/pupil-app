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
      }
    })
  }).run(function (Session) {
});
