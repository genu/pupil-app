'use strict';

angular.module('app.payment').config(function ($stateProvider) {
  $stateProvider
    .state('app.payment', {
      url: '/payment',
      views: {
        'pageContent': {
          templateUrl: 'payment/views/payment.html',
          controller: 'PaymentCtrl as payment',
          resolve: {
            card: function (profile, Profile) {
              return Profile.getCard(profile.user_id);
            }
          }
        }
      }
    })
});
