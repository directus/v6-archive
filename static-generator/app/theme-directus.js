define('ace/theme/directus', ['require', 'exports', 'module', 'ace/lib/dom'], function (require, exports, module) {
  exports.isDark = false;
  exports.cssClass = 'ace-directus';

  // NOTE: This uses an ES6 template literal string in order to make editing the CSS
  //   from within the JS file bearable. The browser support is okay, but if
  //   someone reports an 'unexpected token' error in an old browser, this is
  //   probably why.

  // Blue = 3498DB
  // Purple = B26CEE
  // Red = F44336
  exports.cssText = `
  ::selection {
    background: #3498DB;
  }
  .ace-directus .ace_gutter {
    background: #FFFFFF;
    color: #CCCCCC;
    border-right: 1px solid #EEEEEE;
  }

  .ace-directus .ace_print-margin {
    width: 0;
  }

  .ace-directus {
    background-color: #FFFFFF;
    color: #222222;
  }

  .ace-directus .ace_cursor {
    color: #000000;
  }

  .ace-directus .ace_marker-layer .ace_selection {
    background: #B5D5FF;
  }

  .ace-directus.ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px 0px #FFFFFF;
  }

  .ace-directus .ace_marker-layer .ace_step {
    background: rgb(198, 219, 174);
  }

  .ace-directus .ace_marker-layer .ace_bracket {
    margin: -1px 0 0 -1px;
    border: 1px solid #BFBFBF;
  }

  .ace-directus .ace_marker-layer .ace_active-line {
    background-color: #FFFFFF;
  }

  .ace-directus .ace_gutter-active-line {
    background-color: #F6F6F6;
  }

  .ace-directus .ace_marker-layer .ace_selected-word {
    border: 1px solid #CCCCCC;
    border-radius: 2px;
  }

  .ace-directus .ace_constant.ace_language,
  .ace-directus .ace_keyword,
  .ace-directus .ace_meta,
  .ace-directus .ace_variable.ace_language {
    color: #3498DB;
  }

  .ace-directus .ace_invisible {
    color: #BFBFBF;
  }

  .ace-directus .ace_constant.ace_character, .ace-directus .ace_constant.ace_other {
    color: #275A5E;
  }

  .ace-directus .ace_constant.ace_numeric {
    color: #3A00DC;
  }

  .ace-directus .ace_entity.ace_other.ace_attribute-name,
  .ace-directus .ace_support.ace_constant,
  .ace-directus .ace_support.ace_function {
    color: #3498DB;
  }

  .ace-directus .ace_fold {
    background-color: #C800A4;
    border-color: #000000;
  }

  .ace-directus .ace_fold-widget {
    opacity: 0.3;
  }

  .ace-directus .ace_fold-widget:hover {
    opacity: 1;
  }

  .ace-directus .ace_entity.ace_name.ace_tag,
  .ace-directus .ace_support.ace_class,
  .ace-directus .ace_support.ace_type {
    color: #790EAD; // light purple
  }

  .ace-directus .ace_storage {
    // color: #C900A4; // pink
  }

  .ace-directus .ace_string {
    // color: #DF0002; // red
  }

  .ace-directus .ace_comment {
    color: #999999;
  }

  .ace-directus .ace_twig {
    color: #B26CEE;
  }

  .ace-directus .ace_directus {
    color: #F44336;
  }

  .ace-directus .ace_operator {
    color: #B26CEE;
  }

  .ace-directus .ace_identifier {
    color: #B26CEE;
    background-color: rgba(178,108,238, 0.1);
    border-radius: 3px;
  }

  .ace-directus .ace_indent-guide {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==) right repeat-y
  }`;

  var dom = require('../lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});
