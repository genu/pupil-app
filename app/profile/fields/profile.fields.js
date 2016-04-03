'use strict';

angular.module('app.profile').value('ProfileFields',
  {
    name: [
      {
        key: 'first_name',
        type: 'floating-input',
        templateOptions: {
          type: 'text',
          label: 'First Name',
          required: true,
          placeholder: 'First Name'
        }
      },
      {
        key: 'last_name',
        type: 'floating-input',
        templateOptions: {
          type: 'text',
          label: 'Last Name',
          required: true,
          placeholder: 'Last Name'
        }
      }
    ],
    phone: [
      {
        key: 'phone_number',
        type: 'floating-input',
        templateOptions: {
          type: 'text',
          label: 'Phone Number',
          required: true,
          placeholder: 'Phone Number'
        }
      }
    ],
    school: [
      {
        key: 'school',
        type: 'select',
        templateOptions: {
          label: "Select School",
          options: [],
          valueProp: 'id',
          labelProp: 'name'
        },
        controller: function ($scope, School) {
          return School.findAll().then(function (schools) {
            $scope.to.options = schools;
          });
        }
      }
    ]
  }
);
