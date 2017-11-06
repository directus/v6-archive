define(function (require) {
  'use strict';

  var $ = require('jquery');
  var app = require('app');
  var Notification = require('core/notification');

  // listen to alter events!
  app.on('progress', showProgressNotification);
  app.on('load', hideProgressNotification);
  app.on('loaded', onAppLoaded);

  app.on('alert:error', showError);
  app.on('alert:warning', showWarning);

  /**
   * Hide the loading indicator overlay
   */
  function onAppLoaded() {
    $('.loading').removeClass('blocking fading');
  }

  /**
   * Display an error message if the app isn't locked
   *
   * This function is the handler of the main app's alert:error event
   *
   * TODO: This function doesn't have to exist here. Use Notification.error as event handler directly
   *
   * @param  {String} title       Error message title
   * @param  {String} details     Error message content
   * @param  {?}      showDetails This doesn't seem to do anything TODO: figure it out & remove if possible
   * @param  {Object} moreOptions Noty.js options object
   */
  function showError(title, details, showDetails, options) {
    if (!app.isLocked()) {
      Notification.error(title, details, options);
    }
  }

  /**
   * Display an warning message if the app isn't locked
   *
   * This function is the handler of the main app's alert:warning event
   *
   * TODO: This function doesn't have to exist here. Use Notification.warning as event handler directly
   *
   * @param  {String} title       Error message title
   * @param  {String} details     Error message content
   * @param  {?}      showDetails This doesn't seem to do anything TODO: figure it out & remove if possible
   * @param  {Object} moreOptions Noty.js options object
   */
  function showWarning(title, details, showDetails, moreOptions) {
    if (!app.isLocked()) {
      Notification.warning(title, details, moreOptions);
    }
  }

  /**
   * Make the rabbit run and prevent the user from interacting with the screen
   *
   * Fired when the app event `progress` is triggered
   */
  function showProgressNotification() {
    app.activityInProgress = true;
    $('#header').find('.logo').removeClass('static');
    $('#page-blocker').addClass('blocking');
    app.lockScreen();
  }

  /**
   * Stop the rabbit from running and make the app interactive again
   *
   * Fired when the app event load is triggered
   */
  function hideProgressNotification() {
    app.activityInProgress = false;
    // Stop animation after cycle completes
    $('#header').find('.logo').one('animationiteration webkitAnimationIteration', function () {
      $(this).addClass('static');
    });

    $('#page-blocker').removeClass('blocking');
    app.unlockScreen();
  }
});
