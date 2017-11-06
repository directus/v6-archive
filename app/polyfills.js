define(function () {
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }

  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (prefix) {
      return this.lastIndexOf(prefix, 0) === 0;
    };
  }

  if (!String.prototype.repeat) {
    String.prototype.repeat = function (count) {
      return Array(count + 1).join(this);
    };
  }
});
