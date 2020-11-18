# Global Settings

> **Note:** Only Administrators have access to these pages and settings.

Once Directus is installed you can customize it for your specific project.

* **Site Name:** The name of your project that appears in the browser title
* **Site URL:** Clicking the main logo takes you to this URL
* **CMS User Auto Sign Out:** The number of minutes before users are automatically logged out of Directus
* **Rows Per Page:** The number of items shown on each item listing page
* **CMS Thumbnail URL:** Directus is minimally stylized and unbranded so it can be easily tailored to match your brand/project. Enter the URL to your **170×100px** logo image here – use a PNG with alpha-transparency for a more polished look.*
* **File Naming:** This determines the naming convention for files uploaded through Directus.
    * *File Name*: Saves files using a cleaned-up version of the original file name. Duplicate file names are appended with an integer so no files are accidentally overwritten.
    * *File ID* (default): Saves files with the database ID padded with leading zeros to a length of 11.
    * *File Hash*: A unique hash of the file/upload datetime. This option is ideal when file URLs should not be predictable.
* **Thumbnail Quality:** (0-100, 100 is default) – This is the jpg quality thumbnails within Directus. This value does not influence the actual files you upload through Directus, only the system's thumbnail.
* **Thumbnail Crop Enabled:** When checked (default), Directus will generate system thumbnails for images as a square – other aspect ratios will be cropped to a square. If unchecked, Directus will generate scaled down system thumbnails that maintain their orignal aspect ratio (uncropped).

> **Files Settings:** Changing File/Thumbnail settings will **not** affect any files already uploaded into Directus.
