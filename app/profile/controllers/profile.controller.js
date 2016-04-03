'use strict';

angular.module('app.profile').controller('ProfileCtrl', function ($scope, $stamplay, $ionicPopup, $ionicLoading, Profile, profile, schools, ProfileFields) {
  var vm = this;

  // Data
  this.data = profile;
  this.fields = ProfileFields;
  this.schools = schools;

  this.save = function (profile) {
    $ionicLoading.show();
    profile.DSSave().then(function (res) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Profile saved',
        template: ''
      });
    }).catch(function (err) {
      $ionicLoading.hide();
    });
  };

  this.test = function (file) {
    Profile.updateProfilePicture(file);
  }
});
