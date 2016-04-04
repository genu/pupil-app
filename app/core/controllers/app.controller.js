'use strict';

angular.module('app.core').controller('AppCtrl', function ($rootScope, $state, $cordovaGeolocation, SideMenu, $timeout, $ionicPopup, $ionicLoading, $ionicHistory, DS, profile) {
  this.sideMenuItems = SideMenu.getItems();
  this.profile = profile;

  this.logout = function () {
    $ionicLoading.show();
    DS.definitions.user.logout().then(function () {
      $ionicHistory.clearCache();
      $ionicLoading.hide();
      $state.go('core.main');
    });
  };

  this.toggleAvailability = function () {
    var message = this.profile.isAvailable ? 'Turning ON tutor mode...' : 'Turning OFF tutor mode...';
    $ionicLoading.show({template: message});

    $cordovaGeolocation
      .getCurrentPosition({timeout: 10000, enableHighAccuracy: true})
      .then(function (position) {
        var geoJSON = {
          type: 'Point',
          coordinates: [position.coords.longitude, position.coords.latitude]
        };

        profile._geolocation = geoJSON;
        profile.DSSave().then(function () {
          $ionicLoading.hide();
          $rootScope.$broadcast('tutor:mode_changed');
        })
      });
  }
});
