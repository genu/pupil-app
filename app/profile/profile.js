'use strict';

angular.module('app.profile', ['app.core', 'ngFileUpload'])
  .run(function (SideMenu) {
    SideMenu.add('Profile', 'app.profile', 'ion-person', 1);
  });
