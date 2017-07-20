define(['core/UIView'], function (UIView) {
  return UIView.extend({
    template: '_system/primary_key/input',
    serialize: function () {
      var value = this.options.value;
      var name = this.options.name;

      return {
        value: value,
        name: name
      };
    }
  });
});
