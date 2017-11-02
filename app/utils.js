//  Directus Utils
//  Directus 6.0

//  (c) RANGER
//  Directus may be freely distributed under the GNU license.
//  For all details and documentation:
//  http://www.getdirectus.com

define(['underscore'], function (_) {
  'use strict';

  var Utils = {};

  Utils.convertToBoolean = function (value) {
    return value == null ? false : value != false;
  };

  Utils.isEmpty = function (value) {
    return value == null || value === '';
  };

  Utils.isNothing = function (value) {
    return value === undefined ||
        value === null ||
        value === '' ||
        (!_.isNumber(value) && !_.isDate(value) && _.isEmpty(value) && !_.isBoolean(value));
  };

  Utils.isSomething = function (value) {
    return !Utils.isNothing(value);
  };

  Utils.clearElement = function (element) {
    element.wrap('<form>').closest('form').get(0).reset();
    element.unwrap();
  };

  Utils.joinList = function (list, separator, lastSeparator) {
    var result;

    if (lastSeparator) {
      result = list.slice(0, -1).join(', ') + ' ' + lastSeparator + ' ' + list.slice(-1);
    } else {
      result = list.join(separator);
    }

    return result;
  };

  // NOTE: This are meant to work with single line csv
  Utils.parseCSV = function (string, options) {
    options || (options = {});

    options.trim = options.trim === undefined ? true : options.trim;

    return (string || '').split(',').map(function (name) {
      if (options.trim === true) {
        name = name.trim();
      }

      return name;
    });
  };

  Utils.parseMentions = function (string, html) {
    if (!string) {
      return '';
    }

    var offset = 0;
    var parsedString = string;

    if (html === undefined) {
      html = true;
    }

    while (true) {
      var atPos = string.indexOf('@[');

      if (atPos !== -1) {
        var spacePos = string.substring(atPos).indexOf(' ');

        if (spacePos !== -1) {
          var substring = string.substring(atPos + 2, spacePos + atPos);
          var contains = /^[0-9]|_+$/.test(substring);

          if (contains) {
            var bracketPos2 = string.indexOf(']');

            if (bracketPos2 !== -1) {
              var name = string.substring(spacePos + 1 + atPos, bracketPos2);
              var newTitle = parsedString;
              var newOffset;

              if (html === true) {
                name = '<span class="mention-tag">' + name + '</span>';
              }

              parsedString = newTitle.substring(0, atPos + offset) + name;
              newOffset = parsedString.length;
              parsedString += newTitle.substring(bracketPos2 + offset + 1);
              string = newTitle.substring(bracketPos2 + offset + 1);
              offset = newOffset;

              continue;
            }
          }
        }
      }

      break;
    }

    return parsedString;
  };

  return Utils;
});
