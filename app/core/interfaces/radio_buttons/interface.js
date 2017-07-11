define([
  'underscore',
  'core/UIView'
], function (_, UIView) {
  'use strict';

  function parseOptions(options) {
    if (_.isString(options)) {
      try {
        options = JSON.parse(options);
      } catch (err) {
        options = {};
      }
    }

    return options;
  }

  return UIView.extend({
    template: 'radio_buttons/input',
    events: {
      'change input[type=radio]': 'updateValue',
      'focus input[type=text]': 'checkRadio',
      'input input[type=text]': 'updateCustom'
    },
    updateValue: function (event) {
      this.model.set(this.name, event.currentTarget.value);
    },
    updateCustom: function (event) {
      event.target.parentNode.querySelector('input[type=radio]').value = event.target.value;
      this.model.set(this.name, event.target.value);
    },
    checkRadio: function (event) {
      event.target.parentNode.querySelector('input[type=radio]').checked = true;
    },
    serialize: function () {
      var value = this.options.value || this.columnSchema.get('default_value') || '';
      var options = parseOptions(this.options.settings.get('options'));

      var optionsArray = Object.keys(options).map(function (key) {
        return {
          key: key,
          value: options[key],
          selected: value === key
        };
      });

      var optionKeys = optionsArray.map(function (option) {
        return option.key;
      });

      var optionValues = optionsArray.map(function (option) {
        return option.value;
      });

      var customOption;

      if (optionKeys.indexOf(value) >= 0 || optionValues.indexOf(value) >= 0) {
        customOption = {
          value: '',
          selected: false
        };
      } else {
        customOption = {
          value: value,
          selected: true
        };
      }

      return {
        options: optionsArray,
        name: this.options.name,
        comment: this.options.schema.get('comment'),
        readOnly: this.options.settings.get('read_only') || !this.options.canWrite,
        allowOther: this.options.settings.get('allow_other'),
        customOption: customOption,
        value: value
      };
    }
  });
});
