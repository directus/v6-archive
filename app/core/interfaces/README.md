# Interfaces

A Directus Interface exist of three main pieces:

## Component
The component is imported and executed _once_. Think of it as the metadata of the interface.

The component includes information like the unique name of the interface, it's supported dataTypes, and some methods which control the output of the interface in different scenarios (like listing views).

A generic component looks like this:

```javascript
define([
  './view', // Import the interfaces view-controller
  'core/UIComponent' // The core component to extend from
], function (View, UIComponent) {
  'use strict';

  return UIComponent.extend({
    id: 'interface-name',
    dataTypes: ['INT', 'TINYINT', 'SMALLINT', 'MEDIUMINT', 'BIGINT'],
    options: [
      {
        id: 'read_only',
        ui: 'toggle',
        type: 'Boolean',
        comment: 'Force this interface to be read only',
        default_value: false
      },
      {
        id: 'minimum',
        ui: 'numeric',
        type: 'Number',
        comment: 'Minimum value',
        default_value: 0
      }
    ],
    Input: View,
    validate: function (value, interfaceOptions) {
      if (interfaceOptions.schema.isRequired() && !value) {
        return __t('this_field_is_required');
      }
    }
  });
});
```

The full available options and methods of a Component are:

```javascript
{
  // Unique UI name
  id: null,

  // Supported Data Types for this UI
  dataTypes: [],

  // Interface Options that can be set in Column Settings Page
  options: undefined,

  // Interface global options. (Directus Settings)
  settings: [],

  // Interface Input view (UIView instance)
  Input: null,

  // Returns String that should be used to represent this UI when being listed as part of a table
  list: function(options) {
    return options.value;
  },

  // Value used to sort the Interface
  sort: function(options) {
    return options.value;
  },

  // Default template compiler (Handlebars)
  compileView: function(source, data) {
    var template = Handlebars.compile(source);
    data || (data = {});

    return template(data);
  }
}
```

## View
The Interfaces view is responsible for passing on the value of the interface to the model (more on this later), passing data to the template, and handling user events in the actual DOM.

A typical view looks like this:

```javascript
define(['core/UIView'], function (UIView) {
  return UIView.extend({
    // File path to this interface's template
    //   Relative from /app/core/interfaces/
    template: 'numeric/template',

    // DOM event handlers. See http://backbonejs.org/#View-events for more information
    events: {
      'input input': 'onChangeInput'
    },

    onChangeInput: function (event) {
      // Pass value to model to be saved later
      this.model.set(this.name, event.currentTarget.value);
    },

    // Decide what information is passed to the template
    serialize: function () {
      var value = '';

      return {
        value: value,
        name: this.options.name,
        size: this.options.settings.get('size'),
        placeholder: (this.options.settings) ? this.options.settings.get('placeholder') : '',
        comment: this.options.schema.get('comment'),
        readOnly: this.options.settings.get('read_only') || !this.options.canWrite
      };
    }
  });
});
```

The full set of options and methods:
```javascript
// * = Automatically generated, do not set

{
  // Base route of template attribute
  prefix: 'app/core/interfaces/',

  // Path to Handlebars template file
  template: null,

  // Handlebars template string (use of external file recommended)
  templateSource: null,

  // Handlebars compile options. See http://handlebarsjs.com/reference.html for the full list
  templateCompileOptions: {},

  // Base tag name that the template resides within
  tagName: 'div',

  // Attributes applied to the base tag
  attributes: {
    // This class adds some important styling, do not overwrite unless you know what you're doing
    //   To extend the class list, use the `fieldClass` attribute
    class: 'interface-field'
  },

  // Extend the classes of the parent view
  fieldClass: function () {
    return '';
  }

  // Hide the column name from the output
  hideLabel: false,

  // Force visibility. false = hidden, true = visible, null = don't enforce visibility
  //   this attribute has a higher priority than the user visible setting, so use with care
  visible: null,

  // * Name of the column
  //   Is set to the tables column_name
  name: null,

  // * A ColumnModel containing the tables schema information
  //   Created in /app/schema/ColumnModel.js
  columnSchema: null,

  // * The full data of the object that is being edited
  //   This is the data that eventually gets saved to the DB
  //   Data is saved per column_name, which means you can set the value of the current interface
  //   by running this.model.set(this.name, 'value')
  model: null,

  // * No clue what this is
  settings: null,

  // * All info of this UIView combined with the SchemaModel, SettingsModel, and a bunch of other things
  options: null,

  // Returns if the field is marked as required
  isRequired: function () {
    return this.columnSchema.get('required') === true;
  }
}
```

## Template
