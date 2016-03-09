'use strict';

angular.module('app.core').controller('AppCtrl', function (SideMenu, $state, DS) {
  this.sideMenuItems = SideMenu.getItems();

  this.logout = function () {

    DS.adapters[DS.defaults.defaultAdapter].logout().then(function () {
      $state.go('core.main')
    })
  }
});
