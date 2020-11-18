define(['app', 'backbone', '../models/TemplatesModel'], function (app, Backbone, TemplatesModel) {
  return Backbone.Collection.extend({
    model: TemplatesModel,
    filesAsJSON: function () {
      return this.toJSON();
    }
  });
});
