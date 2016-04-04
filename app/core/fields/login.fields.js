'use strict';

angular.module('app.core').value('LoginFields',
  [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Email Address',
        required: true,
        placeholder: 'Email Address'
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        required: true,
        placeholder: 'Password'
      }
    }
  ]
);
