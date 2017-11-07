/**
 * Schema Utilities
 *
 * TODO: Add an object that handle supported values by types
 *
 * NOTE: We should maybe move some of these into their respective models
 *   instead of relying on an external utility object.
 *
 * NOTE: Some of these are somewhat unneccesary abstractions for abstractions
 *   sake.
 */

define(function (require, exports, module) {
  'use strict';

  var __t = require('core/t');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var UIManager = require('core/UIManager');

  var SchemaUtil = {};

  // All types must be unique
  // NOTE: The first property is the default value
  SchemaUtil.types = {
    DATE: {
      DATETIME: null,
      DATE: null
    },
    DECIMAL: {
      FLOAT: {length: '10,2'},
      DOUBLE: {length: '10,2'},
      DECIMAL: {length: '10,2'},
      NUMERIC: {length: '10,2'}
    },
    INTEGER: {
      INT: {length: 11},
      TINYINT: {length: 1},
      SMALLINT: {length: 5},
      MEDIUMINT: {length: 7},
      BIGINT: {length: 18},
      YEAR: {length: 4}
    },
    STRING: {
      CHAR: {length: 1},
      VARCHAR: {length: 100}
    }
  };

  /**
   * Returns array of type names of given group name
   * @param  {String} group Datatype group
   * @return {Array}        Array of datatype names
   */
  SchemaUtil.getTypes = function (group) {
    return _.keys(this.types[group]);
  };

  /**
   * Get a list of datatypes without grouping
   * @return {Object} All available datatypes
   */
  SchemaUtil.getTypesWithoutGroup = function () {
    var list = {};

    _.each(this.types, function (type) {
      _.each(type, function (value, key) {
        list[key] = value;
      });
    });

    return list;
  };

  /**
   * Get the info of a single datatype by name
   * @param  {String} name Datatype name
   * @return {Object}      Datatype info object
   */
  SchemaUtil.getType = function (name) {
    var types = this.getTypesWithoutGroup();

    return _.find(types, function (value, key) {
      return key === name;
    });
  };

  /**
   * Get array of all datatypes that support numeric values
   * @return {Array} List of string datatype names
   */
  SchemaUtil.getNumericInterfaceTypes = function () {
    // Numeric values can be saved in string based columns as well
    var stringTypes = this.getTypes('STRING');

    var decimalTypes = this.getTypes('DECIMAL');
    var numericTypes = this.getTypes('INTEGER').concat(decimalTypes);
    return numericTypes.concat(stringTypes);
  };

  /**
   * Replace all non-alphanumeric characters with an underscore and convert
   *   value to lowerCase
   *
   * f.e.: Table Name => table_name
   *
   * TODO: Move this to StringUtil
   *
   * @param  {String} identifier Name to convert eg Table Name
   * @return {String}            Converted name  eg table_name
   */
  SchemaUtil.cleanIdentifier = function (identifier) {
    return (identifier || '').replace(/[^a-z0-9-_]+/ig, '_').toLowerCase();
  };

  /**
   * Remove numeric characters from string
   *
   * TODO: Move this to StringUtil
   *
   * @param  {String} name "Dirty" column name eg m4d h4cks
   * @return {String}      Cleaned up column name md_hcks
   */
  SchemaUtil.cleanColumnName = function (name) {
    return this.cleanIdentifier(name).replace(/^[0-9]+/ig, '').toLowerCase();
  };

  /**
   * Filter a collection of Schema ColumnModels
   * @param  {Array} collection       Array of ColumnModels
   * @param  {Array} type             Array of datatype names
   * @param  {Boolean} excludeSystems Remove the system interfaces from the output
   * @return {Array}                  Filtered collection
   */
  SchemaUtil.filterColumns = function (collection, type, excludeSystems) {
    excludeSystems = Boolean(excludeSystems);

    return collection.filter(function (model) {
      var hasType = type.indexOf(model.get('type')) >= 0;
      var isSystem = model.get('system');

      if (excludeSystems) {
        return hasType && !isSystem;
      }

      return hasType;
    });
  };

  /**
   * Extract length value from a single datatype
   * @param  {String} name Name of the datatype
   * @return {String}      Default length value
   */
  SchemaUtil.getTypeDefaultLength = function (name) {
    var type = this.getType(name);
    return type && type.length ? type.length : null;
  };

  /**
   * Get all columns that support a date value from a given collection
   * @param  {Array} collection       Array of ColumnModels
   * @param  {Boolean} excludeSystems Remove the system interfaces from the output
   * @return {Array}                  Filtered array of collections
   */
  SchemaUtil.dateColumns = function (collection, excludeSystems) {
    var dateTypes = this.getTypes('DATE');
    return this.filterColumns(collection, dateTypes, excludeSystems);
  };

  /**
   * Get all columns that support a numeric value from a given collection
   * @param  {Array} collection       Array of ColumnModels
   * @param  {Boolean} excludeSystems Remove the system interfaces from the output
   * @return {Array}                  Filtered array of collections
   */
  SchemaUtil.numericColumns = function (collection, excludeSystems) {
    var numericTypes = this.getNumericInterfaceTypes();
    return this.filterColumns(collection, numericTypes, excludeSystems);
  };

  /**
   * Filter collection of ColumnModels for primary keys
   * @param  {Array} collection  ColumnCollection
   * @return {Array}             Array of primary key columns
   */
  SchemaUtil.primaryColumns = function (collection) {
    return collection.filter(function (model) {
      return model.get('key') === 'PRI';
    });
  };

  /**
   * Check if a given name is a string datatype
   * @param  {String} type Datatype name
   * @return {Boolean}     Is a string-type
   */
  SchemaUtil.isStringType = function (type) {
    var stringTypes = this.getTypes('STRING');
    return stringTypes.indexOf(type) >= 0;
  };

  /**
   * Check if a given name is a numeric datatype
   * @param  {String} type Datatype name
   * @return {Boolean}     Is a string-type
   */
  SchemaUtil.isNumericType = function (type) {
    var decimalTypes = this.getTypes('DECIMAL');
    var numericTypes = this.getTypes('INTEGER').concat(decimalTypes);
    return numericTypes.indexOf(type) >= 0;
  };

  /**
   * Check if a given name is a decimal datatype
   * @param  {String} type Datatype name
   * @return {Boolean}     Is a string-type
   */
  SchemaUtil.isDecimalType = function (type) {
    var decimalTypes = this.getTypes('DECIMAL');
    return decimalTypes.indexOf(type) >= 0;
  };

  /**
   * Check if passed datatype supports a length value
   * @param  {String} type Datatype name
   * @return {Boolean}     Supports length
   */
  SchemaUtil.supportsLength = function (type) {
    return this.isStringType(type) || this.isNumericType(type) || ['ENUM', 'SET'].indexOf(type) >= 0;
  };

  /**
   * Checks if all required options are set on a ColumnModel
   * @param  {Object} column ColumnModel instance or regular object
   * @return {Boolean}       Option is missing
   */
  SchemaUtil.isMissingRequiredOptions = function (column) {
    var requiredOptions = UIManager.getRequiredOptions(column.get('ui'));
    var columnOptions = column.get('options');
    var missing = false;

    _.each(requiredOptions, function (optionName) {
      // NOTE: After we merge the synced data with the existing model a render event is triggered
      //   because the model "changed" with the new synced values, the UIModel is
      //   changed to a plain object. Therefor, this function can either get a UIModel instance
      //   or a plain object.

      // TODO: Make the column options parsed to UIModel

      var option;
      if (columnOptions instanceof Backbone.Model) {
        option = columnOptions.get(optionName);
      } else {
        try {
          columnOptions = JSON.parse(columnOptions);
          option = _.result(columnOptions, optionName);
        } catch (err) {
          // TODO: Handle error
        }
      }

      if (!option || _.isEmpty(option)) {
        missing = true;
      }
    });

    return missing;
  };

  // TODO: Remove this abstraction. Just use UIManager directly
  SchemaUtil.isSystem = UIManager.isSystem;

  module.exports = SchemaUtil;
});
