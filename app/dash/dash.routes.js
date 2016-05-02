'use strict';

angular.module('app.dash')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.dash', {
        url: '/dash',
        views: {
          pageContent: {
            templateUrl: 'dash/views/dash.html',
            controller: 'DashCtrl as dash',
            resolve: {
              geo: function ($cordovaGeolocation) {
                return $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true});
              }
            }
          }
        }
      })
      .state('app.dash.tutor', {
        url: '/tutor',
        templateUrl: 'dash/views/tutor.html',
        controller: 'TutorDashCtrl as tutorDash'
      })
      .state('app.dash.student', {
        url: '/student',
        templateUrl: 'dash/views/student.html',
        controller: 'StudentDashCtrl as studentDash',
        resolve: {
          tutors: function (Profile) {
            return Profile.findAll({
              where: {
                isAvailable: {
                  '==': true
                }
              }
            })
          }
        }
      });
  });
