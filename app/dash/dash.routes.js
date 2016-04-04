'use strict';

angular.module('app.dash')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.dash', {
        url: '/dash',
        views: {
          'pageContent': {
            templateUrl: 'dash/views/dash.html',
            controller: 'DashCtrl as dash',
            resolve: {
              locations: function (profile, Location) {
                return Location.findAll({
                  where: {
                    school_id: {
                      '==': profile.school.id
                    }
                  }
                })
              },
              courses: function (Course) {
                return Course.findAll();
              },
              tutorsQuery: function () {
                return {
                  where: {
                    isAvailable: {
                      '==': true
                    },
                    isTutor: {
                      '==': true
                    }
                  }
                }
              },
              tutors: function (tutorsQuery, Profile) {
                return Profile.findAll(tutorsQuery)
              }
            }
          }
        }
      });
  });
