/**
 * File Utility functions
 *
 * NOTE: Some of these do quite some heavy lifting on the client side.
 * TODO: Figure out a lighter way to do some of these operations
 */

define(function (require, exports, module) {
  var $ = require('jquery');

  var FileUtil = {};

  /**
   * Check if a File object is an image or if a URL is pointing to an image file
   *
   * NOTE: This function is **very heavy** and will block JS execution for a bit
   *   when checking larger files
   *
   * TODO: Investigate if this regex based solution could replace the Image
   *   rendering check: https://gist.github.com/bgrins/6194623
   *
   * @param  {File|String} imageOrURL          file object or URL string pointing to image
   * @param {Function(Boolean):void} callback  Fires when check is done
   */
  FileUtil.isImage = function (imageOrURL, callback) {
    if (this.isFileObject(imageOrURL)) {
      var imageType = /image.*/;
      if (imageOrURL.type.match(imageType)) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      // If the provided image isn't a File object, try loading the url in an
      //   image element and fire the callback on load or on error
      var img = new Image();
      img.onload = function () {
        callback(true);
      };

      img.onerror = function () {
        callback(false);
      };

      img.src = imageOrURL;
    }
  };

  /**
   * Check if an object is an instance of File
   * @param  {Object|File} file The object to check against
   * @return {Boolean}          Provided input is file or not
   */
  FileUtil.isFileObject = function (file) {
    return typeof File === 'undefined' ? false : file instanceof File;
  };

  /**
   * Get the data:url of a provided file
   *
   * NOTE: This function is **very heavy** and will block JS execution for a bit
   *
   * @param  {File}   inputFile   The file to convert to data:url
   * @param  {Function(fileData, details):void} callback
   */
  FileUtil.getDataFromInput = function (inputFile, callback) {
    var details = {
      width: 0,
      height: 0
    };

    var self = this;

    this.isImage(inputFile, function (isImage) {
      var reader = new FileReader();
      reader.onload = function () {
        // If the file is an image, get additional details from the file
        if (isImage) {
          self.getImageDetails(reader.result, function (details) {
            callback(reader.result, details, inputFile);
          });
        } else {
          callback(reader.result, details, inputFile);
        }
      };

      reader.readAsDataURL(inputFile);
    });
  };

  /**
   * Extract details about the given image
   *
   * Details include the fileData string and the dimensions of the image
   *
   * NOTE: This function is **very heavy** and will block JS execution for a bit
   *
   * @param  {String}   image fileData string to render
   * @param  {Function(details, image)} callback
   */
  FileUtil.getImageDetails = function (image, callback) {
    var img = new Image();
    var self = this;

    img.onerror = function () {
      callback(null, image);
    };

    img.onload = function () {
      var details = {
        width: this.width,
        height: this.height
      };

      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, this.width, this.height);

      var dataurl = canvas.toDataURL('image/jpg');
      details.data = dataurl;
      details.size = self.getSizeFromData(dataurl);

      callback(details, image);
    };

    img.src = image;
  };

  /**
   * Resize a provided image to fit (contain) inside the given dimensions
   *
   * NOTE: This function is **very heavy** and will block JS execution for a bit
   * TODO: Since we only use the output of this method for display purposes on the
   *   front-end, we should investigate if we can make it work with CSS (object-fit: contain)
   *
   * @param  {String}   image           fileData of image
   * @param  {Number}   thumbnailWidth  width dimension in px
   * @param  {Number}   thumbnailHeight height dimension in px
   * @param  {Function(String|null)} callback
   */
  FileUtil.resizeFromData = function (image, thumbnailWidth, thumbnailHeight, callback) {
    var img = new Image();

    img.onload = function () {
      var MAX_WIDTH = thumbnailWidth;
      var MAX_HEIGHT = thumbnailHeight;
      var width = this.width;
      var height = this.height;
      var x = 0;
      var y = 0;

      if (width > height) {
        if (width > MAX_WIDTH) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
          x = -((width / 2) - (MAX_WIDTH / 2));
        }
      } else if (width < height) {
        if (height > MAX_HEIGHT) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
          y = -((height / 2) - (MAX_HEIGHT / 2));
        }
      } else {
        width = MAX_WIDTH;
        height = MAX_HEIGHT;
      }

      var canvas = document.createElement('canvas');
      canvas.width = MAX_WIDTH;
      canvas.height = MAX_HEIGHT;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, x, y, width, height);

      var dataurl = canvas.toDataURL('image/jpg');
      callback(dataurl);
    };

    img.onerror = function () {
      callback(null);
    };

    img.src = image;
  };

  /**
   * Get amount of bytes from fileData string
   *
   * Source: https://en.wikipedia.org/wiki/Base64#MIME
   *
   * @param  {String} fileData
   * @return {Number}          size of the fileData in bytes
   */
  FileUtil.getSizeFromData = function (fileData) {
    return (fileData.length - 814) / 1.37;
  };

  /**
   * Convert a size value in bytes to an object containing the size rounded and
   *   fixed to a set amount of decimals and the unit
   * @param  {Number} size      size in bytes
   * @param  {Number} precision amount of decimals
   * @return {Object}           Human readable size and unit
   */
  FileUtil.humanBytesInfo = function (size, precision) {
    precision = precision || 0;
    var i = 0;
    var humanSize;
    var unit;

    while ((size / 1024) > 0.9) {
      size /= 1024;
      i++;
    }

    humanSize = Math.round(size);
    unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i];

    return {
      size: humanSize.toFixed(precision),
      unit: unit
    };
  };

  /**
   * Run the humanBytesInfo method and return the result as a string instead
   *   of an object
   *
   * TODO: Do we need this extra method just to stitch the values?
   *
   * @param  {Number} size      size in bytes
   * @param  {Number} precision amount of decimals
   * @return {String}           Human readable size and unit
   */
  FileUtil.humanReadableSize = function (size, precision) {
    var info = this.humanBytesInfo(size, precision);

    return info.size + info.unit;
  };

  /**
   * Run the humanBytesInfo method and return the result as a string instead
   *   of an object
   *
   * TODO: Do we need this extra method just to stitch the values?
   *
   * @param  {Number} size      size in bytes
   * @param  {Number} precision amount of decimals
   * @return {String}           Human readable size and unit with a space in between
   */
  FileUtil.readableBytes = function (size, precision) {
    var info = this.humanBytesInfo(size, precision);

    return info.size + ' ' + info.unit;
  };

  /**
   * Add event listener to the passed element which hides the element if it
   *   fires an error event
   * @param  {Object} elements jQuery selection of elements
   */
  FileUtil.hideOnImageError = function (elements) {
    $(elements).one('error', function () {
      $(this).hide();
    });
  };

  /**
   * Get the subtype from a MIME type
   * @param  {String} mimeType The full MIME type
   * @return {String}          The subtype
   */
  FileUtil.getSubType = function (mimeType) {
    return mimeType.split('/').pop();
  };

  /**
   * Get the subtype, but change JPEG to JPG
   * @param  {String} mimeType The full MIME type
   * @return {String}          The subtype
   */
  FileUtil.friendlySubtype = function (type) {
    type = (type || '').toLowerCase();

    type = this.getSubType(type);

    if (type === 'jpeg') {
      type = 'jpg';
    }

    return type;
  };

  module.exports = FileUtil;
});
