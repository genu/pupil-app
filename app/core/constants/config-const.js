'use strict';
angular.module('app.core').constant('Config', {
  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'DB_URL': 'https://pupilapp.firebaseio.com',
    'APP_ID': 'pupil',
    'BASEPATH': 'https://pupil.stamplayapp.com/',
    'API_VERSION': '/v1/',
    'STRIPE_PUBLISHABLE_KEY': 'pk_test_YN0sziTqFTY2jtL3EJGlD0qD',
    'PUSHER_KEY': '654197fc1a675095ac1f'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }
});
