# Directus CLI

## Introduction and Help
Directus Command-Line Interface (CLI) provides commands that allow you to perform various tasks such as installation, resetting a user's email, or upgrading the database to the most recent Directus schema.

You can use the `help` command at any time to learn about available CLI actions:

```bash
# this will provide information about the current modules
php bin/directus help
```

To get more information on an specific command you can type "help" followed by the command:

```bash
# this provide information about the **install** module
php bin/directus help install
```

## Install Module
Includes commands to install and configure Directus.

#### Configure Directus:
Creates the `config.php` and `configuration.php` files.

> **IMPORTANT:** This command will overwrite any existing `config.php` and `configuration.php` files.

```bash
php bin/directus install:config -h <db_host> -n <db_name> -u <db_user> -p <db_pass> -r <directus_root> -d <directus_path> -e <directus_email>
```

* `db_host` - The database host
* `db_name` - The database name (it must already exist)
* `db_user` - The database user's name
* `db_pass` - The database user's password
* `directus_root` - (Optional) The Directus root path in your server. Ex: `/var/www/html`
* `directus_path` - (Optional) The Directus path inside the host. If Directus is installed within a subdirectory of the main host, that subdirectory is the <directus_path>
* `directus_email` - (Optional) The Directus email that will be used as sender in the mailing process

Example: http://example.local

```bash
php bin/directus install:config -h localhost -n directus -u root -p pass
```

Example: http://example.local/directus

```bash
php bin/directus install:config -h localhost -n directus -u root -p pass -d directus
```

#### Populate the Database Schema:

Creates all of the Directus Core tables based on the configuration files: `/api/config.php` and `/api/configuration.php`.

```bash
php bin/directus install:database
```

#### Install Initial Configurations:

Create the default admin user and the site's default settings.

```bash
php bin/directus install:install -e <admin_email> -p <admin_password> -t <site_name>
```

* `admin_email` - The admin email
* `admin_password` - The admin password
* `site_name` - The project title

Example:

```bash
php bin/directus install:install -e admin@directus.local -p password -t "Directus Example"
```

## User Module
Includes commands to manage Directus users

#### Change User Password:

```bash
php bin/directus user:password -e <user_email> -p <new_password>
```

* `user_email` - The user's email
* `new_password` - The user's new password

Example:

```bash
php bin/directus user:password -e admin@directus.local -p newpassword
```

## Database Module
Includes commands to manage Directus database schema

**_Note_**: This require that Directus has a valid connection configured in `api/config.php`. [Read more](/developer-guide/configuration.md#apiconfigphp)

**IMPORTANT: Always backup your database before run the database module to prevent data loss.**

#### Install Directus schema:

```bash
php bin/directus db:install
```

#### Upgrade Directus schema:

```bash
php bin/directus db:upgrade
```

## Language Module
Includes commands to manage Directus languages files

#### See all the missing locale keys compared to English:

```bash
php bin/directus language:diff
```
