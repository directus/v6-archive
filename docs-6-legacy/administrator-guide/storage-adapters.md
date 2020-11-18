# Storage Adapters

Beyond local storage, Directus comes with the ability to connect to a number of popular file storage systems such as CDNs, Amazon S3, Rackspace, Azure and Dropbox. Directus uses [Flysystem](https://github.com/thephpleague/flysystem), so you can easily implement other custom adapters.

> [Learn more about creating new custom adapters on Flysystem's site](https://flysystem.thephpleague.com/docs/advanced/creating-an-adapter/).

Storage Adapters configure different destinations for writing/reading files within Directus. Currently they are defined at the instance-level within the `api/configuration.php` file's  `filesystem` attribute.

#### Core Storage Adapters
* `local` – Maps to local filesystem of the application server which hosts the Directus instance
* `ftp` – @TODO

#### Other Supported Storage Adapters
* `AWS S3 v2` – [Maps to Amazon S3 v2 CDN Buckets](https://github.com/thephpleague/flysystem-aws-s3-v2)
* `AWS S3 v3` – [Maps to Amazon S3 v3 CDN Buckets](https://github.com/thephpleague/flysystem-aws-s3-v3)

#### Other Possible Storage Adapters
* [Rackspace Cloud Files](https://github.com/thephpleague/flysystem-rackspace) – Maps to Rackspace OpenCloud CDN Containers
* [Dropbox](https://github.com/thephpleague/flysystem-dropbox)
* [Amazon Cloud Drive](https://github.com/nikkiii/flysystem-acd)
* [OneDrive](https://github.com/jacekbarecki/flysystem-onedrive)
* [Sftp (through phpseclib)](https://github.com/thephpleague/flysystem-sftp)
* [Zip (through ZipArchive)](https://github.com/thephpleague/flysystem-ziparchive)
* [WebDAV (through SabreDAV)](https://github.com/thephpleague/flysystem-webdav)
* [PHPCR](https://github.com/thephpleague/flysystem-phpcr)
* [Redis (through Predis)](https://github.com/danhunsaker/flysystem-redis)
* [Fallback](https://github.com/Litipk/flysystem-fallback-adapter)
* [Memory](https://github.com/thephpleague/flysystem-memory)
* [Google Cloud Storage](https://github.com/Superbalist/flysystem-google-storage)
* [SinaAppEngine Storage](https://github.com/litp/flysystem-sae-storage)
* [Gaufrette](https://github.com/jenkoian/flysystem-gaufrette)
* [OpenStack Swift](https://github.com/nimbusoftltd/flysystem-openstack-swift)
* Google Drive

> **Other Adapters:** If your desired adapter is not listed above you can search for other Flysystem options or create your own custom adapter.

#### Adapter Parameters

```php
'filesystem' => [
    // adapter name
    'adapter' => 'local',
    // By default media directory are located at the same level of directus root
    // To make them a level up outsite the root directory
    // use this instead
    // Ex: 'root' => realpath(BASE_PATH.'/../storage/uploads'),
    // Note: BASE_PATH constant doesn't end with trailing slash
    'root' => BASE_PATH . '/storage/uploads',
    // This is the url where all the media will be pointing to
    // here all assets will be (yourdomain)/storage/uploads
    // same with thumbnails (yourdomain)/storage/uploads/thumbs
    'root_url' => '/storage/uploads',
    'root_thumb_url' => '/storage/uploads/thumbs',
    //   'key'    => 's3-key',
    //   'secret' => 's3-key',
    //   'region' => 's3-region',
    //   'version' => 's3-version',
    //   'bucket' => 's3-bucket'
],
```

#### Installing Adapters

Each adapter's GitHub page explains how to install, but generally you use composer such as in the following example command for the Amazon S3 V3 adapter:

```
composer require league/flysystem-aws-s3-v3
```

#### Configuring S3

```php
'filesystem' => [
    // adapter name
    'adapter' => 's3',
    // this path within the S3 Bucket
    // where the files are going to be uploaded to
    'root' => '/storage/uploads',
    // This is the url where all the media will be pointing to
    // here all assets will be (yourdomain)/storage/uploads
    // same with thumbnails (yourdomain)/storage/uploads/thumbs
    'root_url' => '<your-s3-url>/storage/uploads',
    'root_thumb_url' => '<your-s3-url>/storage/uploads/thumbs',
    'key'    => '<your-s3-key>',
    'secret' => '<your-s3-secret-key>',
    'region' => '<your-s3-region>',
    'version' => '<your-s3-version>',
    'bucket' => '<your-s3-bucket-name>'
],
```

#### Switching Storage adapters

In order to switch from adapter to another, follow the next steps:

- Configure the new adapter in Directus `api/configuration.php` (filesystem) [read s3 example above](/administrator-guide/storage-adapters.md#configuring-s3)
- Backup your `directus_files` table.
- Update all the records in `directus_files` with the storage_adapter to **the new storage adapter**  instead of **current storage adapter**.
  ```sql
  UPDATE `directus_files` SET `storage_adapter` = "<your-new-adapter-name>" WHERE `storage_adapter` = "<your-old-adapter-name>";
  ```

All files should be pointing to the S3 server now.

#### Code Samples

When extending the functionality of Directus Core or your project, it may be necessary to invoke the storage adapter component. Listed below are some references to code samples which demonstrate various ways of deploying storage adapters.

These links point directly to the commit hash which is current as of this writing, so that line numbers do not move out of sync with the documentation. Remember to compare these code snippets with the current state of Directus code in the future, and to update if necessary.

`/directus/api/api.php`

The definition of the upload route shows the most generic (core) way of implementing the storage adapter interface.  We instantiate a new `\Directus\Media\Storage\Storage` object and then call the `acceptFile` method with the incoming local file. The interface automatically fetches the default/thumbnail adapters and passes this information to them.

`/directus/media_auth_proxy/index.php`

The authenticated media proxy front controller uses a slightly more complex implementation. After identifying the Directus Media record being requested, it fetches the record for the corresponding storage adapter. It then passes this record to the method `\Directus\Media\Storage\Storage::getStorage`, which returns the corresponding adapter object, allowing the front controller to fetch the file contents abstractly, irrespective of the underlying driver or file location.

`/directus/bin/generateMissingThumbnails.php`

This implementation uses the same approach as the authenticated media front controller, however it performs more complex operations, such as checking if a file exists, and writing a file to the adapter.
