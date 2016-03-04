'use strict';

angular.module('app.core').value('RegisterFields',
  [
    {
      key: 'email',
      type: 'floating-input',
      templateOptions: {
        type: 'text',
        label: 'Email Address',
        required: true,
        placeholder: 'Email Address'
      }
    },
    {
      key: 'password',
      type: 'floating-input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        required: true,
        placeholder: 'Password'
      }
    }
  ]
);
