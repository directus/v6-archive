<p align="center">
  <a href="https://directus.io" target="_blank" rel="noopener noreferrer">
    <img src="https://user-images.githubusercontent.com/522079/43096167-3a1b1118-8e86-11e8-9fb2-7b4e3b1368bc.png" width="140" alt="Directus Logo"/>
  </a>
</p>

<h1 align="center">
  Directus 6 PHP SDK (Legacy)
</h1>

<h3 align="center">
  <a href="https://directus.io">Website</a> • 
  <a href="https://docs.directus.io">Docs</a> • 
  <a href="https://docs.directus.io/api/reference.html">API Reference</a> • 
  <a href="https://docs.directus.io/app/user-guide.html">User Guide</a> • 
  <a href="https://directus.app">Demo</a> • 
  <a href="https://docs.directus.io/supporting-directus.html">Contribute</a>
</h3>

<p>&nbsp;</p>

> _This codebase is a work-in-progress. The repo is here as a placeholder for anyone interested in contributing to the software development kit. Pull-requests and contributions are welcome!_

<p>&nbsp;</p>

[![Build Status](https://img.shields.io/travis/directus/directus-sdk-php.svg?style=flat-square)](https://travis-ci.org/directus/directus-sdk-php)
[![Scrutinizer](https://img.shields.io/scrutinizer/g/directus/directus-sdk-php.svg?style=flat-square)](https://scrutinizer-ci.com/g/directus/directus-sdk-php)
[![Scrutinizer Coverage](https://img.shields.io/scrutinizer/coverage/g/directus/directus-sdk-php.svg?style=flat-square)](https://scrutinizer-ci.com/g/directus/directus-sdk-php/?branch=master)

For PHP driven applications, use this SDK to more easily communicate with your Directus managed database.

## Requirements

- PHP version 5.5 or greater.

## Install

### Via Composer

You can install the SDK using [Composer](http://getcomposer.org) by adding `directus/sdk` to your `composer.json` `require` list.
```json
{
  "require": {
    "directus/sdk": "^1.1.1"
  },
  "minimum-stability": "dev",
  "repositories": [{
    "type": "git",
    "url": "https://github.com/wellingguzman/zend-db"
  }]
}
```

Make sure `dev` is the `minimum-stability`. We are using a forked version of Zend-DB, and because it's not released under any new name or version, we have to set `minimum-stability` to `dev` in order to composer find the repository in GitHuba and install Zend-DB.

Then run `composer install`.

Composer will download all dependencies and copy them into a directory with the name of `vendor`.

To use the SDK you have to include the [composer autoload](https://getcomposer.org/doc/01-basic-usage.md#autoloading). The composer autoload is a file that is located in the `vendor` directory, named `autoload.php`.

```php
require_once 'vendor/autoload.php';
```

## Usage

### Database Connection

``` php
require 'vendor/autoload.php';

$config = [
    'database' => [
        'hostname' => 'localhost',
        'username' => 'root',
        'password' => '123',
        'database' => 'directus_db',
        // Optional
        // 'port' => 3306,
        // 'charset' => 'utf8'
    ],
    'filesystem' => [
        'root' => '/path/to/directus/storage/uploads'
    ]
];

$client = \Directus\SDK\ClientFactory::create($config);
$articles = $client->getItems('articles');

foreach ($articles as $article) {
    echo $article->title . '<br>';
}
```

### Directus Hosted

You can sign up for a Directus Hosted account at https://directus.io.

```php
require 'vendor/autoload.php';

$client = \Directus\SDK\ClientFactory::create('user-token', [
    // the sub-domain in your instance url
    'instance_key' => 'user--instance',
    'version' => '1' // Optional - default 1.1
]);

$articles = $client->getItems('articles');
foreach ($articles as $article) {
    echo $article->title . '<br>';
}
```

### Your own server

```php
require 'vendor/autoload.php';

$client = \Directus\SDK\ClientFactory::create('user-token', [
    // Directus API Path without its version
    'base_url' => 'http://directus.local',
    'version' => '1' // Optional - default 1.1
]);

$articles = $client->getItems('articles');
foreach ($articles as $article) {
    echo $article->title . '<br>';
}
```

## Getting the whole response

The whole response is either an `Entry` or `EntryCollection` object, it depends whether the result is a single item or a collection of items.

While the attribute can be accessed and be set like an array it's not an actual array.

Ex:

```php
$articles = $client->getItems('articles');
// OK
$title = $articles['title'];

$articles = $client->getItems('articles');
// Error
$data = array_merge(['title' => 'Default'], $articles);
```

### Getting the whole response as an array

```php
$articles = $client->getItems('articles');
$articlesArray = $articles->toArray();
// Works
$data = array_merge(['title' => 'Default'], $articlesArray);
```

### Getting the data response

A response include data and metadata, by default interacting with the `EntryCollection` or `Entry` you are interacting with the "data" object.

### Getting the data as an array

```php
$articles = $client->getItems('articles');
$articlesArray = $articles->getData();
```

## Metadata
The metadata is another `Entry` object which wrap the metadata information, it can also access and set data like an array but it's not an array.


### Getting the metadata

```php
$articles = $client->getItems('articles');
$metadata = $articles->getMetaData();
```

```php
$articles = $client->getItems('articles');
$metadataArray = $articles->getMetaData()->getData();
```

<p>&nbsp;</p>

----

<p align="center">
  Directus is released under the <a href="http://www.gnu.org/copyleft/gpl.html">GPLv3</a> license. <a href="http://rangerstudio.com">RANGER Studio LLC</a> owns all Directus trademarks and logos on behalf of our project's community. Copyright © 2006-2018, <a href="http://rangerstudio.com">RANGER Studio LLC</a>.
</p>
