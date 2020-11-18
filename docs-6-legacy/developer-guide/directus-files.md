# Directus Folder Structure & Key Files
This page gives a high-level overview of the files and folders of Directus.

### api
Contains all server-side and lightly-abstracted database code.

----------

### app
Contains all client-side application code.
* core
* **core-ui** – Contains all user-interfaces available within Directus core. These UIs should not be edited, deleted or added to – any UI customizations should be added to `/ui`.
* modules
* schema
* **templates** – Contains all page html/handlebars markup for Directus

----------

### assets
Contains all referenced less, js, css, font, and image files. The unbranded aspect of Directus means there should be no need to edit anything in this folder. All custom css and javascript should live within proprietary UIs, extensions, or list-views (see below).

----------

### bin
TK

----------

### dist
TK

----------

### extensions
Contains any proprietary extensions your project may use. Extensions are a catch-all for CMS functionality, if it can't be handled by Directus core or UIs, then extensions are a sandbox for any Each extension present here is automatically loaded into the system unless prepended with an underscore ("_example"). Extensions are self contained, so all templates, logic, etc is within its own folder – for initial setup use the provided example as a guideline... just remember to remove the prepended underscore to activate.

----------

###installation
Contains all the necessary files to install and setup Directus. Once completed, this entire folder can and should be removed.

----------

### listviews
Contains custom templates for proprietary item listing pages. As a primer, reference the core list views within `app/modules/xxx/views` until a proper example list view is included.

----------

### media_auth_proxy
TK

----------

### node_modules
TK

----------

### ui
Contains custom UIs (user interfaces) which are used as the inputs for data within the framework. Proprietary UIs in this folder are supplementary to the _core_ UIs located within: `app/core-ui` – though the file structure/syntax is identical other than location. An `exampleui.js` file is included, but for more a more comprehensive understanding the core UIs should be perused. Any UIs added to this folder will be immediately available after refreshing the framework.
