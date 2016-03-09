'use strict';

angular.module('app.dash').controller('DashCtrl', function ($cordovaGeolocation, $ionicLoading, NgMap, user) {
  var vm = this;
  $ionicLoading.show();

  NgMap.getMap().then(function (map) {

  });

  this.setCurrentLocation = function () {
    $ionicLoading.show();
    $cordovaGeolocation
      .getCurrentPosition({timeout: 10000, enableHighAccuracy: true})
      .then(function (position) {
        $ionicLoading.hide();
        vm.coords = [position.coords.latitude, position.coords.longitude];
      });
  };

  // Get location
  this.setCurrentLocation();
});
