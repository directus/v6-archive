/* global $ */
define(['app', 'backbone', 'core/t', 'core/extensions', 'core/notification', './CreateTemplateModalView', './EditTemplatePathModalView', 'ace/ace'],

function (app, Backbone, __t, Extension, Notification, CreateTemplateModalView, EditTemplatePathModalView, ace) {
  return Extension.View.extend({
    msgTimeout: 3000,
    template: 'static-generator/app/templates/main',
    initialize: function () {
      this.listenTo(this.collection.savedTemplates, 'sync', this.render);
      this.collection.savedTemplates.fetch();
      var self = this;
      setInterval(function () {
        self.saveAll();
      }, 30000);
    },
    serialize: function () {
      return {
        savedPages: this.collection.savedTemplates.pagesAsJSON(),
        savedIncludes: this.collection.savedTemplates.includesAsJSON(),
        loadedFiles: this.collection.loadedTemplates.filesAsJSON(),
        directoryStructuresAsUL: this.collection.savedTemplates.directoryStructuresAsUL(),
        config: this.collection.savedTemplates.config()
      };
    },
    afterRender: function () {
      var tpl = this.collection.loadedTemplates.findWhere({selected: true}),
        self = this;

      if (tpl) {
        ace.config.set('themePath', '../customs/extensions/static-generator/app');
        // ace.config.set('modePath', '../customs/extensions/static-generator/app');
        this.editor = ace.edit('editor-' + tpl.get('id'));
        this.editor.setTheme('ace/theme/directus');
        // this.editor.session.setMode('ace/mode/directus');
        this.editor.session.setMode('ace/mode/twig');
        this.editor.renderer.setScrollMargin(10, 10);
        this.editor.templateId = tpl.get('id');

        this.editor.getSession().on('change', function (e) {
          var selected = self.collection.loadedTemplates.findWhere({selected: true});
          selected.set({modified: true});
          selected.set({contents: self.editor.getValue()});
          $('#label-' + selected.get('id')).addClass('modified');
          self.saveBtn.setEnabled(true);
        });
      }
    },
    events: {
      'click .create-new-template': 'createTemplate',
      'click .page-route.save i': 'saveTemplate',
      'click i.delete-file': 'deleteTemplate',
      'click i.edit-file': 'editTemplatePath',
      'click .close-tab': 'unloadTemplate',
      'click .tab-link, .file': 'loadTemplate',
      'click #generate': 'generateSite',
      'click #edit-output-dir': 'editOutputDir',
      'click #save-output-dir': 'saveOutputDir',
      'change #generation': 'updateGenerationMethod'
    },
    editOutputDir: function () {
      $('#save-output-dir, #output-dir').removeClass('hidden');
      $('#output-dir-text, #edit-output-dir').addClass('hidden');
      $('#output-dir').focus();
    },
    saveOutputDir: function () {
      var self = this;
      var outputDirectory = $('#output-dir').val();
      var generationMethod = $('#generation').val();

      this.model.save({
        generateSite: false,
        updateGenerationSettings: true,
        generationMethod: generationMethod,
        outputDirectory: outputDirectory
      }, {
        success: function (model, response) {
          Notification.success(null, response.message, {timeout: self.msgTimeout});
          $('#save-output-dir, #output-dir').addClass('hidden');
          $('#output-dir-text, #edit-output-dir').removeClass('hidden');
          $('#output-dir-text').val(outputDirectory);
          self.model.unset('updateGenerationSettings');
          self.collection.savedTemplates.updateConfig({generationOutputDirectory: outputDirectory});
        }
      });
    },
    updateGenerationMethod: function () {
      var self = this;
      var outputDirectory = $('#output-dir').val();
      var generationMethod = $('#generation').val();

      this.model.save({
        generateSite: false,
        updateGenerationSettings: true,
        generationMethod: generationMethod,
        outputDirectory: outputDirectory
      }, {
        success: function (model, response) {
          Notification.success(null, response.message, {timeout: self.msgTimeout});
          self.model.unset('updateGenerationSettings');
          self.collection.savedTemplates.updateConfig({generationMethod: generationMethod});
        }
      });
    },
    generateSite: function () {
      var self = this;
      var outputDirectory = $('#output-dir').val();

      this.model.save({
        updateGenerationSettings: false,
        generateSite: true,
        outputDirectory: outputDirectory
      }, {
        success: function (model, response) {
          Notification.success(null, response.message, {timeout: self.msgTimeout});
          self.model.unset('generateSite');
        }
      });
    },
    initSaveBtn: function (saveBtn) {
      this.saveBtn = saveBtn;
    },
    loadTemplate: function (e) {
      var fileId = $(e.target).attr('data-id');
      var tpl = this.collection.loadedTemplates.findWhere({id: fileId});
      var selected = this.collection.loadedTemplates.findWhere({selected: true});

      if (selected) {
        selected.set({contents: this.editor.getValue()});
        selected.set({selected: false});
      }

      if (!tpl) {
        tpl = this.collection.savedTemplates.findWhere({id: fileId});
        this.collection.loadedTemplates.push(tpl);
      }

      if (tpl.get('modified')) {
        this.saveBtn.setEnabled(true);
      } else {
        this.saveBtn.setEnabled(false);
      }

      tpl.set({selected: true});
      this.render();

      $('#file-' + fileId).addClass('active');
    },
    unloadTemplate: function (e) {
      var tpl = this.collection.loadedTemplates.findWhere({id: $(e.target).attr('data-id')}),
        self = this;

      app.router.openModal({type: 'yesno', text: __t('Save file?'), callback: function (res) {
        if (!tpl) {
          return false;
        }

        if (res == 'yes') { // save and close
          tpl.set({contents: self.editor.getValue()});
          self.model.save({
            id: tpl.get('id'),
            contents: self.editor.getValue(),
            filePath: tpl.get('file')
          }, {
            success: function (model, response) {
              Notification.success(null, response.message, {timeout: self.msgTimeout});
              self.collection.loadedTemplates.remove(tpl);
              tpl = self.collection.loadedTemplates.first();
              var selected = self.collection.loadedTemplates.findWhere({selected: true});

              if (!selected && tpl) {
                tpl.set({selected: true});
              }

              self.render();
            }
          });
        } else { // close, don't save
          self.collection.loadedTemplates.remove(tpl);
          tpl = self.collection.loadedTemplates.first();
          var selected = self.collection.loadedTemplates.findWhere({selected: true});

          if (!selected && tpl) {
            tpl.set({selected: true});
          }

          self.render();
        }

        if (tpl) {
          tpl.set({modified: false});
        }
        self.saveBtn.setEnabled(false);
      }});
    },
    createTemplate: function () {
      this.saveAll();
      app.router.openViewInModal(new CreateTemplateModalView({
        model: this.model
      }));
    },
    editTemplatePath: function (e) {
      this.saveAll();
      var tpl = this.collection.savedTemplates.findWhere({id: $(e.target).attr('data-id')});

      app.router.openViewInModal(new EditTemplatePathModalView({
        model: tpl
      }));
    },
    saveTemplate: function () {
      var tpl = this.collection.loadedTemplates.findWhere({selected: true}),
        self = this;
      tpl.set({contents: this.editor.getValue()});

      this.model.save({
        generateSite: false,
        updateGenerationSettings: false,
        id: tpl.get('id'),
        contents: this.editor.getValue(),
        filePath: tpl.get('file')
      }, {
        success: function (model, response) {
          Notification.success(null, response.message, {timeout: self.msgTimeout});
          tpl.set('modified', false);
          self.saveBtn.setEnabled(false);
          self.render();
        }
      });
    },
    saveAll: function () {
      var self = this;
      if (self.collection.loadedTemplates) {
        self.collection.loadedTemplates.each(function (model) {
          if (model.get('modified')) {
            model.save({
              generateSite: false,
              updateGenerationSettings: false,
              id: model.get('id'),
              contents: model.get('contents'),
              filePath: model.get('file')
            }, {
              success: function (model, response) {
                model.set({modified: false});
                self.saveBtn.setEnabled(false);
                self.render();
              }});
          }
        });
      }
    },
    deleteTemplate: function (e) {
      this.saveAll();
      var self = this;
      app.router.openModal({type: 'confirm', text: __t('Are you sure you want to delete this file?'), callback: function () {
        var tpl = self.collection.savedTemplates.findWhere({id: $(e.target).attr('data-id')});

        tpl.destroy({
          success: function (model, response) {
            Notification.success(null, response.message, {timeout: self.msgTimeout});
            Backbone.history.loadUrl(Backbone.history.fragment);
          }
        });
      }});
    }
  });
});
