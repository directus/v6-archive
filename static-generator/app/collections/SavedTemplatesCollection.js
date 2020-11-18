define(['app', 'backbone', '../models/TemplatesModel'], function (app, Backbone, TemplatesModel) {
  return Backbone.Collection.extend({
    url: '/api/extensions/static-generator/templates',
    model: TemplatesModel,
    pagesAsJSON: function () {
      return new Backbone.Collection(this.where({
        type: 'page'
      })).toJSON();
    },
    includesAsJSON: function () {
      return new Backbone.Collection(this.where({
        type: 'include'
      })).toJSON();
    },
    directoryStructuresAsUL: function () {
      var res = new Backbone.Collection(this.where({
        hasDirectoryTree: true
      })).toJSON();
      return res[0];
    },
    config: function () {
      var res = new Backbone.Collection(this.where({
        hasConfig: true
      })).toJSON();
      return res[0];
    },
    updateConfig: function(setting) {
    	var res = this.findWhere({hasConfig: true});
    	res.set(Object.keys(setting)[0], Object.values(setting)[0]);
    }
  });
});
