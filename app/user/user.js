'use strict';

angular.module('app.user', ['app.core'])
  .run(function (SideMenu) {
    SideMenu.add('Profile', 'app.profile');
  });
