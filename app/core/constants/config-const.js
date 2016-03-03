'use strict';
angular.module('app.core').constant('Config', {
  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'DB_URL': 'https://pupilapp.firebaseio.com'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }
});
