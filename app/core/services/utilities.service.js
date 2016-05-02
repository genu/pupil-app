'use strict';

angular.module('app.core').service('Utilities', function ($document) {
  this.getElementDimensions = function (dom_element) {
    return {
      height: $document[0].getElementsByTagName(dom_element)[0].clientHeight,
      width: $document[0].getElementsByTagName(dom_element)[0].clientWidth
    }
  };

  this.formatSessionTime = function (timestamp) {
    function pad(num) {
      if (num.toString().length === 1) {
        return 0 + '' + num;
      }
      return num;
    }

    var hours, minutes, seconds;

    hours = Math.floor(timestamp / 3600) % 24;
    timestamp -= hours * 3600;
    minutes = Math.floor(timestamp / 60) % 60;
    timestamp -= minutes * 60;
    seconds = timestamp % 60;

    return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
  }
});
