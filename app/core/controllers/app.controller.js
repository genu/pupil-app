'use strict';

angular.module('app.core').controller('AppCtrl', function (SideMenu) {
  this.sideMenuItems = SideMenu.getItems();
});
