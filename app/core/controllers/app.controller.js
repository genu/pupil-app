'use strict';

angular.module('app.core').controller('AppCtrl', function ($q, $rootScope, $state, $interval, $ionicPopup, Config, $cordovaGeolocation, SideMenu, $timeout, $ionicLoading, $ionicHistory, DS, profile, geo) {
  var vm = this;

  this.sideMenuItems = SideMenu.getItems();
  this.profile = profile;
  this.state = $state;
  this._tutorLocationUpdaterTimer = undefined;

  function _updateLocation() {
    var deferred = $q.defer();

    $cordovaGeolocation
      .getCurrentPosition({timeout: 10000, enableHighAccuracy: true})
      .then(function (position) {
        profile._geolocation = {
          type: 'Point',
          coordinates: [position.coords.longitude, position.coords.latitude]
        };

        profile.DSSave().then(function () {
          deferred.resolve();
        })
      });

    return deferred.promise;
  }

  $rootScope.$on('location:update', function () {
    _updateLocation()
  });

  $rootScope.$on('availability:toggle', function () {
    _updateLocation().then(function () {
      $ionicLoading.hide();
    })
  });

  $interval(function () {
    console.log("updating...");
    $rootScope.$broadcast('location:update');
  }, 5000);


  this.logout = function () {
    $ionicLoading.show();
    DS.definitions.user.logout().then(function () {
      $ionicHistory.clearCache();
      $ionicLoading.hide();
      $state.go('core.main');
    });
  };

  this.becomeATutor = function () {
    $ionicPopup.alert({
      title: 'Sending Transcript',
      template: 'Official transcripts are required in order to tutor other students. Please send official transcripts to the address below<br/><br/>' + Config.ENV.PHYSICAL_ADDRESS
    });
  };

  this.toggleAvailability = function () {
    var message = this.profile.isAvailable ? 'Turning ON tutor mode...' : 'Turning OFF tutor mode...';
    $ionicLoading.show({template: message});

    $rootScope.$broadcast('availability:toggle');
  };

  this.openDashboard = function (state) {
    $state.go(state);
  }
});
