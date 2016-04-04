'use strict';

angular.module('app.payment').controller('PaymentCtrl', function ($state, Payment, PaymentFields, DSStamplayAdapter, $ionicPopup, profile, stripe, card) {
  var vm = this;
  this.fields = PaymentFields;
  this.card = card;
  this.stamplay = DSStamplayAdapter.getService();

  this.isUpdatingCard = _.isUndefined(card);

  // var token = stripe.create
  // Payment.charge(profile.user_id, card.card_id, 10.00, 'USD').then(function (res) {
  //   // debugger;
  // }).catch(function (err) {
  //   // debugger;
  // });

  this.addCard = function (card) {
    card.exp_month = moment(card.expiration).format('M');
    card.exp_year = moment(card.expiration).format('YY');

    delete card.expiration;

    stripe.card.createToken(card).then(function (response) {
      Payment.addCard(profile, user_id, response.id).then(function (res) {

      });
      vm.stamplay.Stripe.createCreditCard(profile.user_id, response.id).then(function (res) {
        $ionicPopup.alert({
          title: 'Credit card added',
          template: 'You can now reserve time with tutors'
        });
        $state.go('app.dashboard');
      }).catch(function (err) {
        $ionicPopup.alert({
          title: 'Error'
        })
      })
    }).catch(function (error) {
    });
  }
});
