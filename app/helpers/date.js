define(['moment'], function (moment) {
  var helper = {};

  /**
   * Get start and end date of month of given date object
   *
   * Exports dates in string format like follows:
   * 2017-11-01 00:00:00
   * 2017-11-30 23:59:59
   *
   * http://stackoverflow.com/a/26131085
   *
   * @param  {Object} momentDate A Moment.js Date object
   * @return {Object}            Start and end date
   */
  helper.getMonthDateRange = function (momentDate) {
    var year = momentDate.format('YYYY');
    var month = momentDate.format('M');

    // Create new moment date object based on the start date
    //   Months are 0 based, so subtract 1 to get the right month in the output
    var startDate = moment([year, month - 1]);

    // .endOf alters the original moment date object, so clone it by creating
    //   a new moment object of the existing one to prevent the original one
    //   from being overridden
    var endDate = moment(startDate).endOf('month');

    // Format output dates to the following format:
    //   2017-11-02 00:00:00
    startDate = startDate.format('YYYY-MM-DD') + ' 00:00:00';
    endDate = endDate.format('YYYY-MM-DD') + ' 23:59:59';

    return {start: startDate, end: endDate};
  };

  /**
   * Get array of Moment.js date objects between from and to dates
   * @param  {Object} from Start date in range. Moment.js date object
   * @param  {Object} to   End date in range. Moment.js date object
   * @return {Array}       Array of Moment.js date objects ranging from the
   *                       from till to dates
   */
  helper.range = function (from, to) {
    var range = [];

    var current = from.toDate();
    while (current <= to.toDate()) {
      range.push(moment(current));

      // Increment the to-be-processed date by 1 day
      current = new Date(current.setDate(current.getDate() + 1));
    }

    return range;
  };

  /**
   * Get array of Moment.js date objects between a given to date and a number
   *   of days before that date
   * @param  {Object} to   Moment.js date object
   * @param  {Number} days Days to subtract from the given to date
   * @return {Array}      [description]
   */
  helper.rangeUntil = function (to, days) {
    // remove one day form the given days param to include the `to` date in the
    //   output range
    days = parseInt(days, 10) - 1;
    var from = moment().subtract(days, 'days');

    return this.range(from, to);
  };

  /**
   * Check if a given date object is today
   * @param  {Object} date Moment.js date
   * @return {Boolean}     Given date is today or not
   */
  helper.isToday = function (date) {
    date = moment(date);

    return moment().diff(date, 'days') === 0;
  };

  return helper;
});
