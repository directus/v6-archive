# Versions & Updating

> **Note:** Only Administrators have access to these pages and settings.

Below is the process for manually updating Directus. Please note that all Directus Hosted instances are automatically updated after a certain duration of proven stability.


### 1. Backup your database:

In addition to scheduled backups, you should always manually create another complete database backup before making any broad CMS/database changes.


### 2. Get Directus:

Download and unzip the newest Directus package from the [release list](https://github.com/directus/directus/releases).

> **Note:** Developers who installed Directus by cloning the git repository directly to their server can simply `pull` the newest stable version. Typically this is as simple as navigating to the Directus folder and running: `git pull origin build`


### 3. Replace Files:

If you are not using git, and you are copying and pasting the downloaded files, make sure the new Directus files don't overwrite any custom files that you have added into the `storage` or `customs` directories. Also ensure your `/api/config.php` and `/api/configuration.php` remain unchanged.


### 4. Upgrade database:

Run the migration script to update your database/schema using the command below:

```
$ bin/directus db:upgrade
```
  
**Note:** Make sure to upgrade the composer dependencies, as needed.
