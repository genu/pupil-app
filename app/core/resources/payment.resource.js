'use strict';

angular.module('app.core')
  .service('Payment', function (DS, DSStamplayAdapter) {
    return DS.defineResource({
      name: 'Payment',
      getCreditCard: function (user_id) {
        return DSStamplayAdapter.getCreditCard(user_id);
      },
      charge: function (user_id, token, amount, currency) {
        return DSStamplayAdapter.charge(user_id, token, amount, currency);
      }
    })
  }).run(function (Payment) {
});
