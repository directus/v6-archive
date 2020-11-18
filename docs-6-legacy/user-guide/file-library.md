# File Library

This page provides a listing of _all_ files uploaded into the Directus platform as well as any videos or embeds (eg: _YouTube_, _Vimeo_) that have been linked. Full-featured and intuitive, this page performs the role of asset management.

> **Developer Note:** You can add additional columns to `directus_files` to extend and customize this system.

## Folders
"Nestable" folders are displayed at the top of the page.

> **Developer Note:** Directus folders are not mirrored as directories on the filesystem.

## Uploading New Files
If your user has uploading enabled, you can upload files to the library in several different ways:

* **Drag-and-Drop to Page:** Simply dragging them onto the File Library page from your computer
* **Upload Button:** Click the "+" button in the File Library header
	* **Drag-and-Drop:** One or more files can be dragged from your computer to the upload interface
	* **Browse:** Clicking this button will open a modal to choose one or more files from your computer
	* **URL:** Adding a URL to a file will pull it into Directus. YouTube and Vimeo pages can also be added
* **Item Interfaces:** Any files uploaded to an Item will also appear in the File Library

The following default fields are available for each file:

* **Name:** Defaults to the original file name, but you can change it
* **Caption:** Defaults to the IPTC `caption` (when available) or the YouTube description (when applicable), but you can change it
* **Tags:** Defaults to the IPTC `keywords` (when available) or the YouTube tags (when applicable), but you can change it
* **Location:** Defaults to the IPTC `location` (when available) but you can change it

## Swapping Files
If you have added a file to many items throughout the system and need to change it globally, you can swap the asset. This maintains all relationships and metadata – but swaps the file itself.

## Thumbnails
Directus saves a single thumbnail (200x200) for system purposes. Administrators can adjust the quality (default: 100%) of these thumbnails within Settings. Thumbnails are also pulled from Embed videos when possible.