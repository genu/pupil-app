'use strict';

angular.module('app.core').value('ENUM', {
  SESSION: {
    PENDING: 0,
    AWAITING_HAND_SHAKE: 1,
    PENDING_START: 2,
    IN_PROGRESS: 3,
    FINISHED: 4
  }
});
