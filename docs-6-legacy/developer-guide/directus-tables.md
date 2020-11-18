# Schema Guide
This page provides insight into the core tables containing all system information, allowing your project data to remain decoupled and unsullied by Directus. Therefore at any point these core tables could be deleted and only your _pure_ database content would remain.

### Custom Tables & Fields
The fundamental purpose of Directus is to allow developers to design and create schemas specifically around the needs of their project's scale, performance, architecture, and extensibility. While Directus tries to make no assumptions about your data, there are a few standards which (as of now) should be followed when creating new tables and columns:

* `id` – Currently Directus assumes an `id` field as the Primary Key.
* `active` – "Active" is the default name for the status field. [Learn More](/02-user-guide/02-item-listing.md#active-inactive--delete) or [Configure](/04-developer/03-configuration.md#apiconfigurationphp)
* `sort` – "Sort" is the default field name for storing drag-and-drop reordering values. [Learn More](/02-user-guide/02-item-listing.md#reordering)

### `directus_activity`
This table stores all changes made to item's through Directus. It stores a complete item snapshot, the changes, editor, and other information used in the item history.

| Column		| Value		| Description
|-----			|-----		|-----
|`type` 			| 		| The scope of the activity, such as: `LOGIN`, `ENTRY`, `UI`, `FILES`, or `MESSAGE`
|`action` 		| 		| The action performed within the scope type, such as: `ADD`, `UPDATE`, `LOGIN`, etc
|`identifier` 	| 		| A Human Readable name saved for the activity. This is not relational and won't be updated if the original item is changed later
|`table_name` 	| 		| The table name where the activity took place
|`row_id` 		| 		| The item's record id where the activity took place
|`user` 			| 		| The ID of the Directus User that performed the activity
|`data` 			| 		| The full data saved during the activity. This may not include relational data affected during this activity
|`delta` 		| 		| The difference between the original and new data
|`parent_id` 	| 		| The ID of the parent item when a change is made relationally
|`parent_table` 	| 	| The name of the table when a change is made relationally
|`parent_changed` | [0,1] | A boolean for if the parent item was also changed
|`datetime` 	| 		| The date and time that the activity took place
|`logged_ip` 	| 		| The IP address of the user that performed the activity
|`user_agent` 	| 		| The browser/client user agent that performed the activity

### `directus_bookmarks`
This table stores all of the left-nav bookmarks for Directus. This includes bookmarks that users create as well as the "System" bookmarks at the bottom. Each record is assigned to a specific user.

| Column		| Value		| Description
|-----			|-----		|-----
|`user` 	| [Directus user id]	| This assigns the bookmark to a specific user (there's a ticket to allow for "global" bookmarks using `NULL`)
|`title` 	|		| The text to display in the navigation menu
|`url` 	|		| The path to navigate to when clicked, relative to the Directus root
|`icon_class` 	|		| Deprecated
|`section` 	| ["search" or "other"]	| Which nav section to show the link within. User generated bookmarks use "search", while all system links go within "other"

### `directus_columns`
This tables stores all the info about columns managed by Directus. Namely UI, relationships, and other metadata.

| Column		| Value		| Description
|-----			|-----		|-----
| `table_name` | 	| The name of the table containing the column being edited
| `column_name` | 	| The name of the column being edited
| `data_type` | 	| The datatype of the column. Other database types (eg SQLite) have limited datatypes and this more granular value is used to know exactly how to format/type API responses. If you change the datatype directly in the database be sure to update this value. Some Directus fields are not actual columns (such as `ONETOMANY`), these are saved as an `ALIAS` and represent the ghost column
| `ui` | 	| This stores the current User-Interface ID
| `relationship_type` | `MANYTOONE`, `MANYTOMANY`, `ONETOMANY`	| This column stores the relationship type (`NULL` if non-relational). As an ENUM there are three options:
| `related_table` | 	| Only for relational columns, this value holds the table containing the related data
| `junction_table` | 	| Only for `MANYTOMANY` relational columns, this value holds the junction/bridge/associative table name. This is the table that stores two foreign keys which link related items between two tables
| `junction_key_left` | 	| Only for `MANYTOMANY` relational columns, this value holds the column name (in the junction table) that stores "this" item's ID
| `junction_key_right` | 	| Only for relational columns, this value stores the column name that stores the "right" key: For `MANYTOMANY`, the column name (in the junction table) that stores the related item's ID. For `MANYTOONE`, the column name (in the this table) that stores the related item's ID. Should be the same value as `column_name`. For `ONETOMANY`, the column name (in the related table) that stores this item's ID
| `hidden_input` | [0,1]	| Whether or not this **edit page field** will be hidden from all users. This is global and overrides any user group permissions
| `hidden_list` | [0,1]	| Whether or not this **listing page value** will be hidden from all users. This is global and overrides any user group permissions
| `required` | [0,1]	| Whether or not the field is required before saving the edit item page
| `sort` | [1,2,3...]	| This stores the sort order for the Directus fields. This is based on the database column order but can be changed since column order is tied to lookup/optimizations and the CMS view shouldn't impact that. New items are stored with a `9999` until they are sorted with the drag-and-drop Settings interface
| `comment` | String	| This stores a note to be displayed beside the field on the edit page. This is based on the database column comment but has been decoupled since some database types (eg SQLite) don't natively support comments

### `directus_files`
This table stores the metadata for all files uploaded through Directus. Because files are an integral part of the framework and its interfaces, Directus does not currently support using other tables to manage files. However, you can create your own "File" tables as a "wrapper" by using the Single/Multiple File UIs.

| Column		| Value		| Description
|-----			|-----		|-----
|`active` | 	| Whether a file is active (`1`) or soft-deleted (`0`)
|`name` | 	| The file-system name of the asset as it is saved within the storage adapter
|`title` | 	| The display name of the file
|`location` | 	| A column to store the location metadata for the file. This is pulled from the IPTC data for images but can be overridden
|`caption` | 	| A column to store the caption metadata for the file. This is pulled from the IPTC data for images but can be overridden
|`type` | 	| The MIME type for the file. eg `image/png`
|`charset` | 	| Typically `binary`
|`tags` | 	| A column to store the CSV keywords metadata for the file. This is pulled from the IPTC data for images but can be overridden
|`width` | 	| The width in pixels for image files
|`height` | 	| The height in pixels for image files
|`size` | 	| The size in bytes for files, or the duration in seconds for video embeds (pulled from embed API when possible)
|`embed_id` | 	| The embed ID (YouTube or Vimeo) for externally stored embedded assets
|`user` | 	| The ID of the Directus User who uploaded/added the file
|`date_uploaded` | 	| The date and time the file was uploaded/added
|`storage_adapter` | 	| Which storage adapter this file is saved within. eg `local` or `s3`


### `directus_groups`
This table stores the User Groups for the Directus privileges system.

| Column		| Value		| Description
|-----			|-----		|-----
|`name` | 	| The name of the user group. "Administrator" is the first/default group and should always be ID = 1
|`description` | 	| Stores a description to help remember the group's purpose
|`restrict_to_ip_whitelist` | 	| Ignored when `NULL`, a CSV of IP addresses can be entered to limit this group's access
|`nav_override` | 	| @TODO
|`show_activity` | [0,1]	| Whether or not the Activity nav item is visible/available to this group
|`show_messages` | [0,1]	| Whether or not the Messages nav item is visible/available to this group
|`show_users` | [0,1]	| Whether or not the Users nav item is visible/available to this group
|`show_files` | [0,1]	| Whether or not the Files nav item is visible/available to this group
|`nav_blacklist` | 	| A CSV of nav item titles that should not be displayed to this group


### `directus_messages`
This table stores all user/group messages and item comments used by the framework.

| Column		| Value		| Description
|-----			|-----		|-----
|`from`| 	| Directus user ID of who sent the message
|`subject`| 	| The subject of the message
|`message`| 	| The body of the message. This allows for @user commenting
|`datetime`| 	| The date and time the message was sent
|`attachment`| 	| The Directus file ID for an attached file @TODO
|`response_to`| 	| If this message is a threaded response to another, the parent's ID will be stored here
|`comment_metadata`| 	| @TODO

### `directus_messages_recipients`
This table tracks all the recipients of each message to know if the message was "read" or not.

| Column		| Value		| Description
|-----			|-----		|-----
|`message_id` | 	| The ID of the message
|`recipient` | 	| The ID of the individual recipient
|`read` | [0,1]	| A boolean for if the message has been viewed/read.
|`group` | 	| Soon to be deprecated. @TODO

### `directus_preferences`
This table stores all of the individual user preferences which allows a user's experience to remain the same between sessions/devices.

| Column		| Value		| Description
|-----			|-----		|-----
|`user` | 	| The user's ID
|`table_name` | 	| The table that the preferences will be saved for
|`title` | 	| A user-generated title for the preferences (used for Bookmarks only)
|`columns_visible` | 	| An ordered CSV of the column names that this user has visible on the table's Item Listing page
|`sort` | 	| The column name to sort by
|`sort_order` | 	| The sort direction for the `sort` column. Available options: `ASC`, `DESC`
|`status` | CSV	 | A CSV of the status IDs (`active` column by default) to be shown. Eg: `1,2` would show active and draft, but not deleted (`0`)
|`search_string` | 	| A string saving any enabled search filters. Eg: `location%3Alike%3ABrooklyn%2Ctitle%3Alike%3A2016`

### `directus_privileges`
Each row on this table is associated with a table (`table_name`) and a Directus user group (`group_id`). Optionally, you can increase the fidelity of your privileges by setting the `status_id` to a an allowed status integer. For instance, you can define a user-group's view privileges for a table specifically  when the _status_ of a record is in draft mode. This might be useful if you'd like your "intern" user-group to only see draft content (not live/published).

The `read_field_blacklist` functions by omitting the given column from the database schema which the API yields, such that the front-end app has no awareness of this column. The `write_field_blacklist` prevents that user group from writing to this column.

The `nav_listed` boolean is used to hide certain tables from the Directus sidebar and table listing. In certain cases you may want records to be visible throughout the CMS (relationally or otherwise) but you don't need that table listed prominently otherwise. You can also use `directus_groups.nav_override` to achieve similar results, but for simply hiding a few tables that might be overkill.

The allow_[permission] columns determine which operations the group may perform on this table. Possible values are: `0` (not allowed), `1` (allowed for content you created), `2` (allowed for content anyone created). To differentiate between who created content (and take advantage of these granular privileges), you must set `directus_tables.user_create_column` to the field within that table which will track the Directus User-ID of the creator.

| Column		| Value		| Description
|-----			|-----		|-----
|`allow_view` | [0,1,**2**] 	| The ability to view a table. Without this permission, the table will be completely omitted from the schema of users in this group
|`allow_add` | [0,**1**]	| The ability to add new items to this table. A value of `2` is not an option since you can't _create_ someone else's content
|`allow_edit` | [0,1,**2**] 	| The ability to edit items from this table
|`allow_delete` | [0,1,**2**]	| The ability to delete items from this table
|`allow_alter` | [0,**1**]	| The ability to modify the table's schema

### `directus_schema_migrations`
This system table tracks your current Directus version and the database schema migrations you have run to ensure your database architecture is up to date.

| Column		| Value		| Description
|-----			|-----		|-----
|`version` | 	| year+month+day+hour+min+sec for when the version file was created so Directus knows the order to run migrations.

### `directus_settings`
This table stores global Directus settings for this instance in name-value pairs.

| Column		| Value		| Description
|-----			|-----		|-----
|`collection` | 	| Soon to be deprecated, this is the category for the name-value-pair
|`name` | 	| The unique name or key for the parameter
|`value` | 	| The value assigned to the parameter

### `directus_tables`
This is where system information is stored about all tables managed by Directus.

| Column		| Value		| Description
|-----			|-----		|-----
|`table_name` | 	| The table name being configured, this must be unique.
|`hidden` | [**0**,1] 	| Determines if the table is completely hidden from Directus (`1`) or not (`0`).
|`single` | [**0**,1]	| Determines if the table contains only one record/item (`1`) or multiple (`0`). When Single tables are clicked in the sidebar, the Item Listing page is skipped, taking users directly to the Item Edit page. The lone item should have an `id` of `1`.
|`default_status` | [**1**...]	| This is the table's default status value – which must be an option within the configuration file's Status Mapping.
|`footer` | [**0**,1]	| Determines if a table footer should be shown on the  Item Listing page with helper functions for INT columns such as: Average, Min, Max, etc.
|`list_view` | 	| Allows for the Item Listing page to be overridden with a custom view template. @TODO
|`column_groupings` | 	| Soon to be deprecated, this column was used to group columns on the Item Edit page.
|`primary_column` | 	| This stores the column name for the table's unique primary key. As of now Directus requires all tables to use an `id` column here.
|`user_create_column` | 	| Optional. Enter the name of a column to store the Directus User ID that created the item.
|`user_update_column` | 	| Optional. Enter the name of a column to store the datetime that the item was created.
|`date_create_column` | 	| Optional. Enter the name of a column to store the Directus User ID that last modified the item.
|`date_update_column` | 	| Optional. Enter the name of a column to store the datetime that the item was last modified.
|`filter_column_blacklist` | 	| A CSV of column names in this table that should not be included in the Item Listing page's filter component.

### `directus_ui`
This tables stores all of the global options/settings for the column User Interfaces (UIs). Since you can change UIs, you may have values within this table that are no longer used – however this allows switching between UIs without losing the saved options therein.

| Column		| Value		| Description
|-----			|-----		|-----
|`table_name` | 	| The table that contains the column
|`column_name` | 	| The column that uses the UI
|`ui_name` | 	| The UI being edited
|`name` | 	| The name of the UI option being saved
|`value` | 	| The value of the UI option being saved

### `directus_users`
All the users, including admins, are added within this table. Each user is assigned to a single User Group (`directus_groups`), and that group determines the privileges (`directus_privileges`) for all of its users. 

| Column		| Value		| Description
|-----			|-----		|-----
|`active` | [0,**1**]	| Determines if the user is active (`1`) or not (`0`)
|`first_name` | 	| The first name of the user
|`last_name` | 	| The last name of the user
|`email` | 	| The (unique) email address for the user (used for login). Shown on the default user card listing
|`password` | 	| This is encrypted password for the user. It is a SHA1 hash of the random salt (below) and chosen password
|`salt` | 	| A randomly generated hash to more securely encrypt the password
|`token` | 	|  The API token for this user. Changing this hash may break any APIs using this user to authenticate
|`access_token` | 	| A Directus token/hash used to further secure the user's session identifiers, helping to prevent session hijacking
|`reset_token` | 	| A unique token hash used to identify and authorize password change requests
|`reset_expiration` | 	| The datetime that the above `reset_token` stops working – typically 24-48 hours after being emailed to the user's email address
|`position` | 	| A plain text field for storing the user's position or role. Shown on the default user card listing
|`email_messages` | [0,**1**]	| A toggle for forwarding (`1`) or not forwarding (`0`) Directus messages to the user's email address
|`last_login` | 	| A datetime value of the last time the user logged into Directus
|`last_access` | 	| A datetime value of the last time the user was active within Directus
|`last_page` | 	| The path to the last page the user visited within Directus. This allows users to start where they left off previously
|`ip` | 	| The last known IP address the user accessed Directus from
|`group` | 	| The ID of this user's User Group (from `directus_groups`). The chosen group determines this users access privileges
|`avatar` | 	| The URL to an image avatar for this user. By default Directus saves the Gravatar image based on the email address
|`avatar_file_id` | 	| An override to the above default, this sets the avatar to a file ID from within `directus_files`
|`location` | 	| A plain text field for storing the user's location or office. Shown on the default user card listing
|`phone` | 	| A plain text field for storing the user's phone number. Shown on the default user card listing
|`address` | 	| A plain text field for storing the user's address
|`city` | 	| A plain text field for storing the user's city
|`state` | 	| A plain text field for storing the user's state
|`zip` | 	| A plain text field for storing the user's zip code

#### Manually Setting Passwords
If you need to manually reset a user's password directly in the database you can use the following SQL snippet. Remember to replace the `id` value below with the actual ID of the user you wish to update.

```
UPDATE `directus_users` 
SET `salt` = SHA1(RAND()), `password` = SHA1(CONCAT(salt, 'new-password-here'))
WHERE `id` = 1
```
