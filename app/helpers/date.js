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

  helper.range = function (from, to) {
    var range = [];
    from = moment(from);
    to = moment(to);

    var current = from.toDate();
    while (current <= to.toDate()) {
      range.push(moment(current));
      current = new Date(current.setDate(current.getDate() + 1));
    }

    return range;
  };

  helper.rangeUntil = function (to, days) {
    var from;

    // remove one day to include `to` date
    days = parseInt(days, 10) - 1;
    to = moment(to);
    from = moment().subtract(days, 'days');

    return this.range(from, to);
  };

  helper.isToday = function (date) {
    date = moment(date);

    return moment().diff(date, 'days') == 0;
  };

  return helper;
});
