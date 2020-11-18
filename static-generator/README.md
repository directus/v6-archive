# Static Site Generator Extension
Directus extension which generates static HTML documents based on the content stored in your Directus instance.

## Installation

1. Clone this repo into `/customs/extensions/static-generator`:  
`$ cd customs/extensions`  
`$ git clone git@github.com:directus/extension-static-generator.git static-generator`
2. Install the `npm` dependencies of the extension:  
`$ cd static-generator`  
`$ npm install`

> Note: If you've installed this extension by downloading this repo as zip, and moving it into the folder yourself; please make sure to rename the folder to `static-generator`

## Settings
There are two settings available for this extension. These settings can be set from within the extension:
1. `Output Directory`: This is where the generated site will be stored.  Currently, only local storage is supported and output is restricted to the Directus app directory.
2. `Automatic Code Generation`: Generation can be done either on a predefined schedule, or when content is updated by a user. Note that to schedule updates, a cron job must be set up on the server. See `Setting up for recurring site` generation below.

## Templating
This extension utlizes [the Twig templating language](https://twig.symfony.com/doc/2.x/templates.html).  In addition to standard Twig language constructs, the following Directus specific markup is available:

### Route/url definition:
If defined, a page will be generated and stored in the specified directory.  For example,
```
<!--- directus_route: /path/to/my/page --->
```
will result in a generated page stored as `/path/to/my/page/index.html`.  A route can also contain Directus syntax to create dynamic pages:
```
<!--- directus_route: /users/{{directus_users.id | filters[id][gt]=0}} --->
```
This example will result in a generated page for each user in the system: `/users/1/index.html`, `/users/2/index.html`, etc.  
> NOTE:  All routes are relative to your `Output Directory`, as defined in the extension settings.

### Accessing Directus data for single pages:
Directus data can be accessed with the following syntax: `{{ directus.<table_name>("your-filters") }}`.  For example,
```twig
{% for user in directus.directus_users("filters[id][gt]=0") %}
    <li><a href="/example/users/{{ user.id }}">{{ user.email }}</a></li>
{% endfor %}
```
Filters use the Directus syntax as defined in [the API Docs](https://api.getdirectus.com/1.1/#Filters).

### Accessing Directus data for dynamic pages.
Dynamic page objects can be accessed with the `directus.this` syntax. For example, individual user pages with the route `<!--- directus_route: /users/{{directus_users.id | filters[id][gt]=0}} --->` can access data for each user with the following tag:
```twig
{{ directus.this.email }} // user's email
```

> NOTE: There are example pages included with the extensions to demonstrate these concepts by default.


## Automatic generation.
The extension provides you with a setting to setup automatic re-generation of the static pages on either content changes or on a frequency. Alternatively, a cron job can be set up to generate the website based on the selected frequency in the extensions admin panel settings. To do so, set up a cron job on
your server to run every minute:
```cron
* * * * * wget -O - https://<yoursite.com>/api/extensions/static-generator/cron >/dev/null 2>&1
```

> NOTE: This is for Linux based systems and require the `wget` program, which is typically installed by default.
