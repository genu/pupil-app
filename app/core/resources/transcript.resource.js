'use strict';

angular.module('app.core').service('Transcript', function (DS) {
  return DS.defineResource({
    name: 'transcript'
  })
}).run(function (Transcript) {
});
