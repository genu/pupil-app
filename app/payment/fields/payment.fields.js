'use strict';

angular.module('app.payment').value('PaymentFields',
  {
    card: [
      {
        key: 'name',
        type: 'floating-input',
        templateOptions: {
          type: 'text',
          label: 'Name on Card',
          required: true,
          placeholder: 'Name on Card'
        }
      },
      {
        key: 'number',
        type: 'floating-input',
        templateOptions: {
          type: 'number',
          label: 'Card Number',
          required: true,
          placeholder: 'Card Number'
        }
      },
      {
        key: 'exp_month',
        type: 'floating-input',
        templateOptions: {
          type: 'text',
          label: 'Expiration Month',
          required: true,
          placeholder: 'Expiration Month'
        }
      }, {
        key: 'exp_year',
        type: 'floating-input',
        templateOptions: {
          type: 'text',
          label: 'Expiration Year',
          required: true,
          placeholder: 'Expiration Year'
        }
      }, {
        key: 'cvc',
        type: 'floating-input',
        templateOptions: {
          type: 'password',
          label: 'CVC',
          required: true,
          placeholder: 'CVC'
        }
      }
    ]
  }
);
