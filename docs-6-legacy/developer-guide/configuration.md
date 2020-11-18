# Configuration Files
These files are automatically generated during the installation process, alternatively you can utilize the sample files to setup manually.

## api/config.php
This file contains project-specific constants for the Directus framework. These values are typically not changed after initial setup.

* **Default timezone**
* **API version utilized** (`API_VERSION`)
* **Environment** (`DIRECTUS_ENV`)
    * `production` => error suppression, nonce protection
    * `development` => no error suppression, no nonce protection (allows manual viewing of API output)
    * `staging` => no error suppression, no nonce protection (allows manual viewing of API output)
    * `development_enforce_nonce` => no error suppression, nonce protection
* **Database Connection Settings**
    * `DB_HOST` => MySQL hostname, often "localhost"
    * `DB_NAME` => MySQL database name
    * `DB_USER` => MySQL database user with appropriate permissions
    * `DB_PASSWORD` => The password for the above MySQL user
    * `DB_PREFIX` => An optional table prefix. If set, only tables with prefix will be managed
    * `DB_CHARSET` => Tells the server what character set the connection will send the information
* **Paths and URLs**
    * `DIRECTUS_PATH` => Directus Application Path, i.e. "/"
    * `$host` => Server Name i.e. "www.example.com"
    * `ROOT_URL` => Based off the $host, this is scheme-less (agnostic to http/https)
    * `ROOT_URL_WITH_SCHEME` => Same as ROOT_URL but explicitly defines the scheme (https://). Use this for emailing URLs(links, images etc) as some clients will trip on the scheme agnostic ROOT_URL
    * `APPLICATION_PATH` => Absolute path to application

* **Status Options**
    * `STATUS_DELETED_NUM` => When utilizing the status column for soft-delete policy, this is the integer used for deleted items. This is important because Directus ignores deleted items system-wide as opposed to inactive or other status states.
    * `STATUS_ACTIVE_NUM` => Similarly, the active column has special meaning within the soft-delete policy as it is considered truly "active"
    * `STATUS_COLUMN_NAME` => (Default: "active") This is the adjustable column name for the status system. Adding a column of this name (datatype: INT/TINYINT) will enable a soft-delete policy for that table. The settings for the above active/deleted values (and any additional workflow stages) can be set within api/configuration.php.

----------

### api/configuration.php
This file contains the configuration arrays for the Directus framework.

* **Session Prefix** This value allows you to run multiple versions of Directus on the same server without the sessions conflicting.
* **HTTP/HTTPS** Here you can set the _forceHttps_ variable (defaults to: false)
* **SMTP** Allows you to configure the host, port, username, and password for your SMTP mail server. (Utilized by _messages_ and _forgot password_). _**This is going to be removed in future versions.**_
* **Mail** Allows you to configure the mail transport and default `from` address.

Supported transport:
   - **mail**
   
      Example:
   
```php
    'mail' => array(
        'from' => array(
            'john@directus.io' => 'John Doe'
        ),
        'transport' => 'mail'
    ),
```
   - **sendmail**
   
      Example:

```php
    'mail' => array(
        'from' => array(
            'john@directus.io' => 'John Doe'
        ),
        'transport' => 'sendmail'
    ),
```
   - **smtp**
   
      Example:

```php
    'mail' => array(
        'from' => array(
            'john@directus.io' => 'John Doe'
        ),
        'transport' => 'smtp',
        'host' => 'mail.host.domain',
        'username' => 'user',
        'password' => 'pass',
        'port' => '123',
    ),
```

* **Action/Event Hooks** (hooks)
   Hooks allow you to hook function to be called in a specific time during the executing of Directus.
   Ex: Execute a function after a new post was created.

* **Filter Hooks** (filters)
   Same as Action/Event Hooks, with the different that the data passed can be altered.
   Ex: Format post published data into a specific timezone
   
   Read the [hook complete list](/developer-guide/hooks.md)
* **Database Table Blacklist** (tableBlacklist) Is an array of table names that will be ignored by the Directus framework
* **Status Mapping** (statusMapping) Is a multi-dimensional array of options for the status system (soft-delete policy) allowing for a customizable workflow to be defined. The following options exist as illustrated by the framework defaults:
    * key => (0, 1, and 2) represents the value to be saved in the status field (defined above) if that option is selected
    * name => (Deleted, Live, Draft) is the visible terminology displayed to the user in the UI
    * color => (#c1272d, #5b5b5b, #bbbbbb) is a hex value that the option name will be displayed in, for instance deleted is red, Live is dark gray, and Draft is a light gray)
    * sort => (3, 1, 2) is the order the options will be shown in as determined by your specific content workflow

<small>Default Status Mapping</small>
```
0 => [
    'name' => 'Deleted',
    'text_color' => '#FFFFFF',
    'background_color' => '#F44336',
    'subdued_in_listing' => true,
    'show_listing_badge' => true,
    'hidden_globally' => true,
    'hard_delete' => false,
    'published' => false,
    'sort' => 3
],
1 => [
    'name' => 'Published',
    'text_color' => '#FFFFFF',
    'background_color' => '#3498DB',
    'subdued_in_listing' => false,
    'show_listing_badge' => false,
    'hidden_globally' => false,
    'hard_delete' => false,
    'published' => true,
    'sort' => 1
],
2 => [
    'name' => 'Draft',
    'text_color' => '#999999',
    'background_color' => '#EEEEEE',
    'subdued_in_listing' => true,
    'show_listing_badge' => true,
    'hidden_globally' => false,
    'hard_delete' => false,
    'published' => false,
    'sort' => 2
]
```

#### IP Whitelisting for User-Groups
If your project requires that certain user-groups have access limited to specific IP addresses you can set their **`directus_groups->restrict_to_ip_whitelist`** to `1`. Then enter any allowed IP addresses (and a brief description) into the **`directus_ip_whitelist`** table. 

#### Sidebar Navigation Blacklist for User-Groups
By default, Directus shows all tables that the current user's group has `list` and `view` access to. To hide certain tables from this list on a group basis, simply enter a CSV of table names into **`directus_tab_privileges.directus_tab_blacklist`**.

#### Customizing the Sidebar Navigation for User-Groups
By default, Directus displays all available tables alphabetically in the navigation sidebar under the "Tables" group header. To customize this you can build a tailored JSON string and save it within **`directus_tab_privileges->nav_override`** for the desired user group.

```
{
    "Office": {
        "Staff": {
            "path": "/tables/staff"
        },
        "Locations": {
            "path": "/tables/locations"
        }
    },
    "Portfolio": {
        "Projects/Work": {
            "path": "/tables/projects"
        },
        "Clients (Brands)": {
            "path": "/tables/clients"
        }
    }
}
```

#### Custom Data Workflow
Tables containing a status column (default column name of `active`) track the publish state of their items/records. Initially, options of `Live`(1), `Draft`(2), and `Deleted`(0) are all options for all tables with a status column. These options, and their associated display-color and saved-value, are [editable and extendable within the configuration.php file](https://github.com/RNGR/directus6/wiki/1.-Installation-&-Configuration#apiconfigurationphp).

Furthermore, all table permissions for user-groups can be assigned globally or for specific status states. The following should outline this extensive level of customization:

* Every Directus `user` belongs to a single `user-group`
* Each `user-group` has adjustable `view`, `add`, `edit`, and `delete` permissions (admins also have `alter`) every table
* The `view`, `edit`, and `delete` permissions also have respective "big" variations able to distinguish between item's the *current user* created versus an item *any* user created. This gives the ability to restrict permissions based on if it's "yours". (This option requires a "magic owner column" which tells Directus which field in the table stores the creator's `directus_user.id`)
* Each `user-group` also has control over `read` and `write` for every field within every table
* All of the above permissions can be assigned at the global level, or, for tables with a status column, individually for each available status state (such as `draft` or `deleted`).

To create a custom data workflow for your users simply set different permissions for each individual status state. This will allow you to restrict which status options are available to users, when they're editing an item of a given state.
