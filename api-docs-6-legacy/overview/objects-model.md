# Directus Objects
These are the Directus object models used throughout the system.

## Meta Object

<span class="attributes">Attribute</span> | Description
----------------------------- | ----------------------
**type** _String_             | Whether the data returned is a `collection` or a single `item`
**table** _String_            | Table the data was fetched from
**Active** _Integer_          | How many `active` items has this table
**Draft** _Integer_           | How many `draft` items has this table
**Delete** _Integer_           | How many `deleted` items has this table
**total** _Integer_            | How many items were returned
**total_entries** _Integer_    | How many items the table has

The status name are configurable and `Active`, `Draft` and `Delete` are the default values.

## Activity Object

<span class="attributes">Attribute</span> | Description
----------------------------- | ----------------------
**id** _Integer_              | Activity Unique Identification number
**type** _String_             | Activity Type: `ENTRY`, `UI`, `FILES`, `SETTINGS`, `UI`, `LOGIN` and `MESSAGES` **@TODO: _Clarification_**
**action** _String_           | Activity Action: `ADD`, `UPDATE`, `DELETE` and `LOGIN`
**identifier** _String_       | The record identifier
**row_id** _Integer_          | The record/item primary key (ID)
**user** _Integer_            | ID of the users that performed the action
**data** _String_             | Data used on the action in json
**delta** _String_            | The difference in the new and old data in json
**parent_id** _Integer_       | ID of the parent record/item, if the current record/item is relational
**parent_table** _String_     | ID of the parent record/item table
**parent_changed** _Boolean_  | Whether or not the parent record/item changed along with its child
**datetime** _String_         | When the activity was performed (UTC Time)
**logged_ip** _String_        | User IP
**user_agent** _String_       | User user agent

## Bookmark Object

<span class="attributes">Attribute</span> | Description
----------------------------- | ----------------------
**id** _Integer_              | Bookmark Unique Identification number
**user** _Integer_            | [Directus user id] This assigns the bookmark to a specific user (there's a ticket to allow for "global" bookmarks using `NULL`)
**title** _String_            | The text to display in the navigation menu
**url** _String_              | The path to navigate to when clicked, relative to the Directus root
**icon_class** _String_       | Deprecated
**active** _String_           | Deprecated
**section** _String_          | ["search" or "other"] Which nav section to show the link within. User generated bookmarks use "search", while all system links go within "other"


## Column Object

<span class="attributes">Attribute</span> | Description
---------------------------------- | ----------------------
**id** _Integer_                   | Column Unique Identification number
**table_name** _Integer_           | The name of the table containing the column
**column_name** _String_           | The name of the column
**data_type** _String_             | The datatype of the column. Other database types (eg SQLite) have limited datatypes and this more granular value is used to know exactly how to format/type API responses. If you change the datatype directly in the database be sure to update this value. Some Directus fields are not actual columns (such as ONETOMANY), these are saved as an ALIAS and represent the ghost column
**ui** _String_                    | This stores the current User-Interface ID
**relationship_type** _String_     | This column stores the relationship type (NULL if non-relational). As an ENUM there are three options: MANYTOONE, MANYTOMANY, ONETOMANY
**related_table** _String_         | Only for relational columns, this value holds the table containing the related data
**junction_table** _String_        | Only for MANYTOMANY relational columns, this value holds the junction/bridge/associative table name. This is the table that stores two foreign keys which link related items between two tables
**junction_key_left** _String_     | Only for MANYTOMANY relational columns, this value holds the column name (in the junction table) that stores "this" item's ID
**junction_key_right** _String_    | Only for relational columns, this value stores the column name that stores the "right" key: `MANYTOMANY` – The column name (in the junction table) that stores the related item's ID. `MANYTOONE` – The column name (in the this table) that stores the related item's ID. Should be the same value as column_name. `ONETOMANY` – The column name (in the related table) that stores this item's ID
**hidden_input** _String_          | [0,1] Whether or not this column's field will be hidden from all users. This is global and overrides any user group permissions
**hidden_list** _String_           | F[0,1] Whether or not this column's field on listing page will be hidden from all users. This is global and overrides any user group permissions
**required** _String_              | [0,1] Whether or not the field is required before saving the edit item page
**sort** _String_                  | [1,2,3...] This stores the sort order for the Directus fields. This is based on the database column order but can be changed since column order is tied to lookup/optimizations and the CMS view shouldn't impact that. New items are stored with a 9999 until they are sorted with the drag-and-drop Settings interface
**comment** _String_               | This stores a note to be displayed beside the field on the edit page. This is based on the database column comment but has been decoupled since some database types (eg SQLite) don't natively support comments

## File Object

<span class="attributes">Attribute</span> | Description
----------------------------- | ----------------------
**id** _Integer_                | File Unique Identification number
**active** _Integer_            | File's status. `0=deleted,1=active, 2=inactive`
**name** _String_               | File name
**title** _String_              | File's title
**location** _String_           | Location of where the picture was taken. if any
**type** _String_               | File mime type
**url** _String_                | File url relativity to Directus base url
**tags** _String_               | Comma separated tags
**caption** _String_            | File caption (Description)
**width** _Integer_             | File width
**height** _Integer_            | File height
**size** _Integer_              | File size in bytes
**embed_id** _String_           | ID of the embeded file. Ex Youtube ID
**user** _Integer_              | File owner (who uploaded the file)
**date_uploaded** _String_      | File uploaded date. **TODO** It should be an DateTime object
**storage_adapter** _String_    | Storage adapter used to upload the file

## Preference Object

<span class="attributes">Attribute</span> | Description
----------------------------- | ----------------------
**id** _Integer_              | Preference's Unique Identification number
**user** _Integer_            | Preference owner. User ID
**table_name** _String_       | Name of the table
**columns_visible** _String_  | List of visible columns, separated by commas
**sort** _String_             | Result will be sorted by this column
**sort_order** _String_       | Sort Order. (ASC=Ascending or DESC=Descending)
**status** _String_           | List of status values. separated by comma

## Privilege Object

<span class="attributes">Attribute</span> | Description
----------------------------- | ----------------------
**id** _Integer_              | Privilege's Unique Identification number
**group_id** _Integer_                | Group ID
**table_name** _String_               | Table name that this permissions belongs to
**allow_add** _Integer_               | Whether the group is allow to add/create entries in the table (See values below)
**allow_edit** _Integer_              | Whether the group is allow to edit/update entries in the table (See values below)
**allow_delete** _Integer_            | Whether the group is allow to delete/remove entries in the table (See values below)
**allow_view** _Integer_              | Whether the group is allow to view/read entries in the table (See values below)
**allow_alter** _Integer_             | Whether the group is allow to add/create entries in the table (See values below)
**nav_listed** _Boolean_              | Whether the table should be visible in the sidebar
**read_field_blacklist** _String_     | List of columns that the group can't view/read
**write_field_blacklist** _String_    | List of columns that the group can't edit/update
**status_id** _String_                | State of the record that this permissions belongs to (Draft, Active or Soft Deleted)

## Table Object

<span class="attributes">Attribute</span> | Description
------------------------------- | ----------------------
**table_name** _Integer_        | Table Unique name.
**hidden** _Boolean_            | Determines if the table is completely hidden from Directus or not
**single** _Boolean_             | Determines if the table contains only one record/item or multiple. When Single tables are clicked in the sidebar, the Item Listing page is skipped, taking users directly to the Item Edit page. The lone item should have an id of 1
**default_status** _Integer_     | This is the table's default status value – which must be an option within the configuration file's Status Mapping
**footer** _Boolean_             | Determines if a table footer should be shown on the Item Listing page with helper functions for INT columns such as: Average, Min, Max, etc
**list_view** _Boolean_          | Allows for the Item Listing page to be overridden with a custom view template @TODO
**column_groupings** _String_    | Soon to be deprecated, this column was used to group columns on the Item Edit page
**primary_column** _String_      | Soon to be deprecated, This stores the column name that represents a table item/record
**user_create_column** _String_  | Optional. Enter the name of a column to store the Directus User ID that created the item
**user_update_column** _Integer_ | Optional. Enter the name of a column to store the datetime that the item was created
**date_create_column** _Integer_ | Optional. Enter the name of a column to store the Directus User ID that last modified the item
**date_update_column** _Integer_ | Optional. Enter the name of a column to store the datetime that the item was last modified
**filter_column_blacklist** _String_ | A CSV of column names in this table that should not be included in the Item Listing page's filter component

## User Object

<span class="attributes">Attribute</span> | Description
----------------------------- | ----------------------
**id** _Integer_              | User's Unique Identification number
**active** _Integer_          | User's status. `0=deleted, 1=active, 2=inactive`
**email** _String_            | User's unique email address
**first_name** _String_       | User first name
**last_name** _String_        | User last name
**password** _String_         | hashed password
**token** _String_            | User's unique API access token
**group** _Integer_           | User's group ID
**email_messages** _Boolean_  | Whether the user wants to receive email notification
**avatar** _String_           | Avatar url
**avatar_file_id** _Integer_  | File id used as avatar
**language** _String_         | User's default language. Language Supported `en` (English), `es` (Spanish), `de` (German), `fr` (French), `it` (Italian), `zh-hans` (Simplified Chinese) and `nl` (Dutch)
**timezone** _String_         | User's default timezone
**position** _String_         | User's position on the project/company
**location** _String_         | User's location in the world or universe
**phone** _String_            | User's phone number
**address** _String_          | User's address
**city** _String_             | User's city
**state** _String_            | User's state
**zip** _String_              | User's zip code
