'use strict';

angular.module('app.classes').config(function ($stateProvider) {
  $stateProvider
    .state('app.classes', {
      url: '/classes',
      views: {
        pageContent: {
          templateUrl: '/classes/views/classes.html',
          controller: 'ClassesCtrl as classes',
          resolve: {
            courses: function (Course) {
              return Course.findAll();
            }
          }
        }
      }
    })
});
