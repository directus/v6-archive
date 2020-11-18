# Thumbnailer 

The Directus Thumbnailer is a dynamic image thumbnailing system used by the Directus framework. The functionality can summerized in the following steps:
  - User requests a specific thumbnail of a file using a URL syntax
  - The request is routed through an .htaccess file (or nginx equivalent) to the PHP thumbnailer file that checks if the thumbnail exists
  - If it does exist, it's simply returned
  - If it does NOT exist, then we check the config's Thumbnail Whitelist (listing of allowed thumbnail sizes), generate the thumbnail (using GD Library), and return it
  - For example, `directus.example.com/thumbnail/200/300/crop/best/original-file-name.jpg` will result in a thumbnail that is 200px wide and 300px tall is cropped and created. If you remove the `crop` or `fit` parameter the thumbnail is fit within the bounds (aspect ratio maintained). The image is NEVER stretched. An optional "quality" param is also available, in this case, `best`.
  - The url path will be mirrored when the thumbnail is created.  In the example, `directus.example.com/thumbnail/200/300/crop/best/original-file-name.jpg`, the thumbnail will be created in `thumbnail/200/300/crop/best/original-file-name.jpg`


## Installation & Config
The thumbnailer is included with every Directus installation. By default, no sizes are whitelisted. To get started with the thumbnailer, enable the sizes you want to support in the [configuration file](https://github.com/directus/directus/blob/master/api/configuration_sample.php#L176-L205). In this configuration file, you can also set options specific to image quality and behavior of cropping and/ord containing your images.

## Examples
The following examples can executed by copying the url into the browser and changing the url to your Directus instance.  

*Make sure you have the correct size(s) whitelisted in the config.*

#### Crop Best 200x300
* URL: `directus.example.com/thumbnail/200/300/crop/best/my-file.jpg`
* RESULT: Cropped file of best quality
* FILE LOCATION: `thumbnail/200/300/crop/best/my-file.jpg`

#### 200x300
* URL: `directus.example.com/thumbnail/200/300/my-file.jpg`
* RESULT: Cropped (default) file of good (default) quality
* FILE LOCATION: `thumbnail/200/300/my-file.jpg`

#### Contain 100x100
* URL: `directus.example.com/thumbnail/100/100/contain/my-file.jpg`
* RESULT: Resized file (aspect ratio preserved) of good (default) quality
* FILE LOCATION: `thumbnail/100/100/contain/my-file.jpg`

> Note: Make sure you have set the `root_url` and `root_thumb_url` keys in `api/configuration.php` to the right paths if you're using Directus in a subfolder. A wrong config will result in 404s where you'd expect an image.
