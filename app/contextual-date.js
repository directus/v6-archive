/**
 * This logic is used to update the content of elements with the contextual-date-updater
 *   class every 60 seconds, to keep the relational timestamp up to date
 *
 * /app/templates/modules/activity/activity-history.handlebars
 *
 * TODO: Move this functionality to the View that renders this element. Should
 *   only star the interval and update cycle when the element is actually rendered
 *   and clear the interval when it's not needed anymore
 */

define(function (require) {
  'use strict';

  var moment = require('moment');
  var _ = require('underscore');
  var $ = require('jquery');

  // Interval time every n milliseconds
  // TODO: Only has to update every minute up to an hour. After an hour, it only
  //   has to update hourly, etc
  var waitTime = 60000;

  function updateTime() {
    var $elements = $('.contextual-date-updater[data-date]');

    _.each($elements, function (element) {
      var $element = $(element);
      var date = moment($element.data('date'));

      if (date.isValid()) {
        $element.text(date.fromNow());
      }
    });
  }

  function interval(callback, wait) {
    setTimeout(function () {
      callback();
      interval(callback, wait);
    }, wait);
  }

  interval(updateTime, waitTime);
});
