'use strict';

angular.module('app.transcripts').config(function ($stateProvider) {
  $stateProvider
    .state('app.transcripts', {
      url: '/transcripts',
      views: {
        pageContent: {
          templateUrl: 'transcripts/views/transcripts.html',
          controller: 'TranscriptsCtrl as transcripts',
          resolve: {
            transcripts: function (profile, Transcript) {
              return Transcript.findAll({
                where: {
                  profile_id: {
                    '==': profile.id
                  }
                }
              })
            }
          }
        }
      }
    })
});
