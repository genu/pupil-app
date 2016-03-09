'use strict';

angular.module('app.core').controller('AppCtrl', function (SideMenu, $timeout, $ionicHistory, $state, DS) {
  this.sideMenuItems = SideMenu.getItems();
  this.logout = function () {

    DS.adapters[DS.defaults.defaultAdapter].logout().then(function () {
      $timeout(function () {
        $ionicHistory.clearCache()
      }, 500);
      $state.go('core.main');

    })
  }
});
