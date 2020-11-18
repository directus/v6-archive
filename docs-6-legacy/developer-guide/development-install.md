# Installation

## Composer Dependency Management

The Directus API is available in PHP (Node is in development) and employs a number of third-party, open-source packages to manage routing, rendering, database access, and so on.

Best practice says that the composer.lock file should be tracked in the application repository. This helps to ensure stability by guaranteeing that over time, and across the development team, the versions of application dependencies will not change with each installation, but will remain exactly the same.

This is especially critical from the perspective of Directus code integration and inter-dependency integration. Case in point: the Slim package (version 2.4) introduced breaking changes in its integration with Twig. Therefore changes to the composer.lock file are extremely sensitive. Here are some guidelines on how to modify Directus’ composer dependencies.

#### Never run composer.phar update
This “updates” the version of each dependency to the latest version. If for whatever reason you need to re-install your vendors, always instead remove your vendor directory and re-run `composer.phar install`

#### Avoid modifying the composer.json file directly
Always modify dependencies using composer.phar because it will modify the lock file directly. For example, to add a new dependency, run this command:

```
composer.phar [require](https://getcomposer.org/doc/03-cli.md#require) vendor/package:version
```

This command updates your JSON file and your lock file without changing the versions of your other dependencies.


## Requirements (Development Specific)

* Apache HTTP Server / Nginx Server
* MySQL Server / Percona Server / MariaDB or equivalent
* PHP >= 5.6.0
* Git
* Composer

Note: Directus may work with other HTTP Server solutions such as Lighttpd and Caddy, but it will need proper configurations and tests.

## Step 1: Setup a Development Environment
You will need to setup a local \*AMP (Apache, MySQL and PHP) or \*EMP (nginx, MySQL and PHP) environment in order to test Directus. \*AMP packages can be found for different platforms:

* [MAMP](http://www.mamp.info/en/index.html) for Mac OS
* [WAMP](http://www.wampserver.com/en/) for Windows
* [LAMP](https://help.ubuntu.com/community/ApacheMySQLPHP) for Linux


## Step 2: Install git
You will need Git to keep your test version of Directus up to date. Unless you already have Git installed, you can download it from [here](http://git-scm.com/).


## Step 3: Pull Directus from GitHub
Create a directory named "directus" in the www root. Next, open the directory in the terminal and run:

```
$ git clone https://github.com/directus/directus.git directus
```


## Step 4: Install Dependencies
Directus uses composer to handle its php dependencies. Go to the `directus/` folder and install composer:

```
$ curl -s https://getcomposer.org/installer | php
```
Then install the dependencies by executing:

```
$ php composer.phar install
```

Read more at the official site on [how to download and install composer](https://getcomposer.org/download/), or [how to install composer globally](https://getcomposer.org/doc/00-intro.md#globally).


## Step 5: Setup the Database
The \*AMP-packages listed above all include PHP-My-Admin. The following three steps need to be completed in order to setup the database

> **Note:** Please disable MySQL Strict Mode before installation. Directus does not fully support Strict Mode due to limitations with the PDO and MySQL Drivers.

#### Using PHP-My-Admin
1. Create the database
	1. Databases -> Create Database
	2. Choose a database name and select *utf8_general_ci* as Collation
2. Create a user
	1. Once you've created the database it will be visible in the left column – click it
	2. Privileges -> Add user
	3. Fill in a *username* and *password*. Leave the other fields as defaults
3. Import the Directus core database schema
	1. Import->File to Import->Choose file
	2. Open `api/schema.sql`
	3. Press Go

#### Using Command Line
1. Connect to MySQL Server

   ```bash
   $ mysql -u <mysql-user-name> -p
   # mysql will ask to type the server password.
   $ Enter password: ****
   ```

Change **<mysql-user-name>** with the database username, typically is **root** by default.

2. Create the Database
	After successfully connect to the MySQL Server, create a database by typing:

	```bash
	mysql> CREATE DATABASE <database-name>`;
	```

	Change **<database-name>** with the desired name for the database – then you can exit the server by typing `exit`.

3. Install Directus
	1. Go to `http://your-directus-host.local/installation` and follow the steps and skip Step 6
	2. Or Import Directus core database schema and do Step 6

		```bash
		$ mysql -u <mysql-user-name> -p <database-name> < api/schema.sql
		# mysql will ask to type the server password.
		$ Enter password: ****
		```


## Step 6: Setup Directus
Open `api/config_sample.php` and add the database, username, and password from Step 5 to *DB_NAME*, *DB_USER* and *DB_PASSWORD*. Save the file as `directus/api/config.php`

```
define('DB_USER', 		'myusername');
define('DB_PASSWORD',	'mypassword');
define('DB_NAME',       'mydatabase');
```


## Step 7: Setup Files Uploads (Optional)
Directus supports different storage adapters, by default all files are uploaded to a directory on the server filesystem using the `local` adapter.

Under `api/configuration.php` there's a `filesystem` array key-value where you configure your storage. [Read more](https://github.com/directus/directus/blob/build/api/configuration_sample.php)


## Step 8: Done!
Open Directus by navigating your browser to the path where it was installed in your local host.

If Directus was installed manually, log in using the default user `admin@admin.com` and password `admin`
