'use strict';

angular.module('app.transcripts').controller('TranscriptsCtrl', function (transcripts, $ionicPopup, Config) {
  this.data = transcripts;

  this.add = function () {
    $ionicPopup.alert({
      title: 'Sending Transcript',
      template: 'Official transcripts are required in order to tutor other students. Please send official transcripts to the address below<br/><br/>' + Config.ENV.PHYSICAL_ADDRESS
    });
  }
});
