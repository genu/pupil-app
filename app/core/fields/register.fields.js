'use strict';

angular.module('app.core').value('RegisterFields',
  [{
    key: "divider",
    type: "item-divider",
    templateOptions: {
      type: "text",
      label: "Your Information",
      placeholder: "First Name",
      required: true
    }
  }, {
    key: 'profile.first_name',
    type: 'input',
    templateOptions: {
      type: 'text',
      required: true,
      placeholder: 'First Name',
      icon: 'ion-ios-person',
      iconPlaceholder: true
    }
  }, {
    key: 'profile.last_name',
    type: 'input',
    templateOptions: {
      type: 'text',
      label: 'Last Name',
      required: true,
      placeholder: 'Last Name',
      icon: 'ion-ios-person',
      iconPlaceholder: true
    }
  }, {
    key: 'profile.phone_number',
    type: 'input',
    templateOptions: {
      type: 'text',
      required: true,
      placeholder: 'Phone number',
      icon: 'ion-ios-telephone',
      iconPlaceholder: true
    }
  }, {
    key: 'profile.school_id',
    type: 'select',
    templateOptions: {
      label: "Select School",
      options: [],
      valueProp: '_id',
      labelProp: 'name'
    },
    controller: function ($scope, DS) {
      DS.findAll('school').then(function (schools) {
        $scope.to.options = schools;
      });
    }
  }, {
    key: "divider",
    type: "item-divider",
    templateOptions: {
      type: "text",
      label: "Account Information",
      placeholder: "First Name"
    }
  }, {
    key: 'credentials.email',
    type: 'input',
    templateOptions: {
      type: 'text',
      required: true,
      placeholder: 'Email',
      icon: 'ion-ios-email',
      iconPlaceholder: true
    }
  }, {
    key: 'credentials.password',
    type: 'input',
    templateOptions: {
      type: 'password',
      required: true,
      placeholder: 'Password',
      icon: 'ion-locked',
      iconPlaceholder: true
    }
  }, {
    key: 'confirmPassword',
    type: 'input',
    templateOptions: {
      type: 'password',
      placeholder: 'Confirm password',
      required: true,
      icon: 'ion-locked',
      iconPlaceholder: true
    },
    extras: {
      validateOnModelChange: true
    },
    validators: {
      confirmPassword: {
        expression: function (viewValue, modelValue, fieldScope) {
          if (!_.isUndefined(fieldScope.model.credentials) && !_.isUndefined(fieldScope.model.credentials.password)) {
            return modelValue === fieldScope.model.credentials.password;
          }
        },
        message: "Passwords do not match'"
      }
    }
  }]
);
