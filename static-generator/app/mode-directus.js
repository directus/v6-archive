require.config({
  paths: {
    'ace/mode/twig': '../customs/extensions/static-generator/node_modules/ace-builds/src-min/mode-twig',
    'ace/mode/twig_highlight_rules': '../customs/extensions/static-generator/node_modules/ace-builds/src-min/mode-twig'
  }
});

define('ace/mode/directus', function (require, exports, module) {
  var oop = require('ace/lib/oop');
  var TwigMode = require('ace/mode/twig').Mode;
  var DirectusHighlightRules = require('ace/mode/directus_highlight_rules').DirectusHighlightRules;

  var Mode = function () {
    TwigMode.call(this);
    this.HighlightRules = DirectusHighlightRules;
  };
  oop.inherits(Mode, TwigMode);

  (function () {
    this.blockComment = {start: '{#', end: '#}'};

    this.getNextLineIndent = function (state, line, tab) {
      var indent = this.$getIndent(line);

      var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
      var tokens = tokenizedLine.tokens;
      var endState = tokenizedLine.state;

      if (tokens.length && tokens[tokens.length - 1].type == 'comment') {
        return indent;
      }

      if (state == 'start') {
        var match = line.match(/^.*[\{\(\[]\s*$/);
        if (match) {
          indent += tab;
        }
      }

      return indent;
    };

    this.checkOutdent = function (state, line, input) {
      return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function (state, doc, row) {
      this.$outdent.autoOutdent(doc, row);
    };
    this.$id = 'ace/mode/directus';
  }).call(Mode.prototype);

  exports.Mode = Mode;
});

define('ace/mode/directus_highlight_rules', function (require, exports, module) {
  var oop = require('ace/lib/oop');

  var TwigHighlightRules = require('ace/mode/twig_highlight_rules').TwigHighlightRules;

  var DirectusHighlightRules = function () {
    this.$rules = new TwigHighlightRules().getRules();

    /**
     * Add Directus intro comment regex into start rules section
     */
    this.$rules.start.unshift({
      token: 'directus',
      regex: '<!---(?:[^\\\\]|\\\\.)*?--->'
    });
  };

  oop.inherits(DirectusHighlightRules, TwigHighlightRules);

  exports.DirectusHighlightRules = DirectusHighlightRules;
});
