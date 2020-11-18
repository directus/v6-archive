# FAQ

## Bug Reporting and Feature Requests
**Report bugs directly on [GitHub Issues](https://github.com/directus/directus/issues/new) – request and vote for new features on [FeatHub](http://feathub.com/directus/directus). For all security related issues, please chat with us directly through [getdirectus.com](http://getdirectus.com/)**

## Manually Resetting User Passwords
[This section](https://github.com/directus/docs/blob/master/04-developer/06-schema-guide.md#manually-setting-passwords) of the Docs explains how to update a password with a SQL command.


## Server Error: Automatically populating $http_raw_post_data is deprecated
Within PHP 5.6.x `$HTTP_RAW_POST_DATA` is deprecated, but sometimes isn't on individual installs ([php bug #66763](https://bugs.php.net/bug.php?id=66763))

To solve this add/use/update this on your php.ini
`always_populate_raw_post_data = -1`

## Server Error Occurred!
If you get "Server error occurred!" the first time you try to login, it likely means that you misconfigured Apache2. Try adding *AllowOverride All* into your virtualHost.

## Internal Server Error
This error can be anything, but when you are using Directus for the first time and you are able to see the installation page or the login page, but as soon as you try to log in see this error, it might be that your hosting provider doesn't allow to use `Option SymLinksIfOwnerMatch` which can be solve by whether make your hosting allow you to use or simple remove that line in `api/.htaccess`. Make sure this is the issue by checking the apache logs, try looking for something like: `Option SymLinksIfOwnerMatch not allowed here`

## 403 Forbidden Error
When HTTP Server threw a 403 error when making a `PATCH` request, it's worth noting that `PATCH` may not be supported by all firewalls, including `mod_security` Apache firewall module. You may be able to overwrite this in `.htaccess`, otherwise you may need to configure your rules manually.

We have not example code for this yet, but at least this will give take you to the right direction.

## Displaying a 404 page
If you are getting 404 page while using the webapp or API, make sure you check the instructions below:

### Using Apache
- Include the `.htaccess` file located in the root directory and the api directory.
- Install and enable `mod_rewrite`

### Using NGINX
- Include the directus locations block into your server config file. The file can be found [here](https://github.com/directus/directus-vagrant/blob/master/config/nginx/default)

## MySQL Strict Mode
Directus does not fully support Strict Mode due to limitations with the PDO and MySQL Drivers. Please disable MySQL Strict Mode before installation.

You can check to see if your database is in strict mode with the following queries:
```
SELECT @@GLOBAL.sql_mode;
SELECT @@SESSION.sql_mode;
SHOW VARIABLES LIKE 'sql_mode';
```

## Enabling `mod_rewrite`

#### Unix
1. In the terminal run `a2enmod rewrite`
2. Restart *apache2* with `/etc/init.d/apache2 restart` or `service apache2 restart`

#### Windows (WAMP)
1. `wamp tray icon > apache > apache module > rewrite_module`

#### Mac (MAMP PRO)
1. Click on `modules` tab.
2. Look for and check `rewrite_module`.

### `mod_rewrite` is enabled and still not working
1. Go to your apache configuration (httpd.conf or apache.conf)
2. Look for the `<Directory>` directive that matches the Directus path.

    Ex:
    ```
    <Directory "/var/www/html">
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
    ```
3. Add `AllowOverride All`, If `AllowOverride None` exists change `None` to `All` to allow `.htaccess` files.

### `mod_rewrite` is enabled and still getting 404 error.

If you are using VirtualDocumentRoot `RewriteBase` needs to be set.

1. Go to `/directus/path/.htaccess` and add `RewriteBase /` just below `RewriteEngine On`.
2. Go to `/directus/path/api/.htaccess` and add `RewriteBase /api` just below `RewriteEngine On`.

### Expecting 'OPEN_ENDBLOCK', got 'EOF'

Getting this error is more likely you are using PageSpeed module, which means it's rewriting the templates html files, making them corrupted as valid Handlebars template.

The solution is to disallowing PageSpeed to rewrite the html files in `app` directory.

See the solution for Apache [here](https://github.com/directus/directus/blob/master/.htaccess) and NGINX [here](https://github.com/directus/directus-vagrant/blob/master/config/nginx/pagespeed.conf).

Apache:
```
ModPagespeedDisallow "*/app/**/*.html"
```

NGINX:
```
pagespeed Disallow */app/**/*.html;
```

*AWS Lightsail has PageSpeed enabled by default.*

### Missing PHP Extension ext-dom

While installing composer the error below will show up if you are missing the php-dom extension required by phpunit.

```
phpunit/phpunit 3.7.38 requires ext-dom * -> the requested PHP extension dom is missing from your system.
```

An option is to not install it, if you don't want to use phpunit as it is a library for development.

Running `composer install --no-dev` will skip the phpunit installation.

If you want to still install the dependency, below are example how to do it.

#### Ubuntu

Look for the package with `apt`:

```
apt-cache search php dom
```

Look through the list for you php version extension name, example: `php5.6-xml` or `php7.0-xml`. After finding the correct name install the package `apt-get install php7.0-xml` and the package should be installed.

Don't forget to run `sudo service apache2 restart` to restart if you are using apache or `sudo service php-fpm restart` if you are using PHP FPM.

### Installing PHP GD Library extension

#### PHP 5.6.x

Ubuntu:
```
sudo apt-get install php5.6-gd
```

#### PHP 7.x

Ubuntu:
```
sudo apt-get install php7.0-gd
```

Without specifying a version will install the latest version.

Ubuntu:
```
sudo apt-get install php-gd
```

Don't forget to run `sudo service apache2 restart` to restart if you are using apache or `sudo service php-fpm restart` if you are using PHP FPM.

### Installing PHP cURL extension

#### PHP 5.x

Ubuntu:
```
sudo apt-get install php5.6-curl
```

#### PHP 7.x

Ubuntu:
```
sudo apt-get install php7.0-curl
```

Without specifying a version will install the latest version.

Ubuntu:
```
sudo apt-get install php-curl
```

### Installing PHP Multibyte String extension

#### PHP 5.x

Ubuntu:
```
sudo apt-get install php5.6-mbstring
```

#### PHP 7.x

Ubuntu:
```
sudo apt-get install php7.0-mbstring
```

Without specifying a version will install the latest version.

Ubuntu:
```
sudo apt-get install php-mbstring
```

Don't forget to restart the web server. Run `sudo service apache2 restart` if you are using apache or `sudo service php-fpm restart` if you are using PHP FPM.

## Error: Class X not found
If a class is missing is there a good chance, you are missing an PHP extension or a composer dependency package.

Try to run `composer update` to fetch the latest dependencies.

If you are updating from to `6.4.4` make sure to run `composer update`, as `Cache\Adapter\Void\VoidCachePool` is a strong dependency.
