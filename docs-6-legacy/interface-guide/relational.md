# Relational Interfaces

Since SQL is a relational database, Directus has several Interfaces that can help clearly and easily manage relationships between items. An item can have related items from the same table (eg: *Project -> Related Project*) or a different table (eg: *Project -> Category*). An item can also have relationships to a single item (eg: *Shirt -> Size*) in a Many-to-One (or One-to-Many) relationship, or to multiple items (eg *Shirt -> Materials*) through Many-to-Many relationships.

> *Note:* For more information about setting up relational interfaces, checkout this [Medium article on the subject](https://medium.com/directus/understanding-relationships-it-isnt-complicated-35e0dcf78450).

> **IMPORTANT:** Make sure that the interface data type and the relational table primary key type are the same, otherwise data may be saved but not returned.

### Single File (M2O)
*Supported Datatypes: `INT`*

This is a M2O relational Interface that links a single file (and YouTube/Vimeo video embeds) by storing the related item's ID – which is why this Interface only works with the INT datatype (also used for IDs). If you have a `books` table you could use this for the `cover_image` column, for a `projects` table this would be the Interface used for columns like: `thumbnail_image`, `wireframe_pdf`, and `background_video`. Basically any column that needs to store a single file.

#### Options
* `allowed_filetypes`: A CSV of file extensions that this Interface will accept. For video embeds you can use `vimeo` and `youtube` as the extension.


### Multiple Files (M2M)
*Supported Datatypes: `MANYTOMANY` (an alias datatype)*

This is a M2M relational Interface that links multiple files (and YouTube/Vimeo video embeds). If you have an `album` table you could use this to store mp3s within `tracks`, for a `projects` table this would be the Interface used for columns like: `hero_slideshow`, `youtube_playlist`, and `press_pdfs`. Basically any column that needs to store multiple files. Currently only Directus Files are accepted by this Interface, so `directus_columns.table_related` must always be set to `directus_files`.

#### Options
* `add_button`: Toggles an "Add" button for adding new files directly into the Interface
* `choose_button`: Toggles a "Choose" button that opens a modal with all existing Directus files to choose from
* `remove_button`: Toggles "Remove" buttons for each file that let's you delete it


### Many-to-Many (M2M)
*Supported Datatypes: `MANYTOMANY` (an alias datatype)*

This is a M2M relational Interface that will make it easy to link the item being edited to multiple other items from another table (or the same table). You can use this to relate multiple `tags` to `projects`, or multiple `staff` to their respective `office`. But be careful about creating a schema/architecture with recursive or deeply nested M2Ms – otherwise you'll end up with a confusing "[Matryoshka doll](https://giphy.com/gifs/Ud5r7tzmG4De0/html5)" user experience.

#### Options
* `visible_columns`: A column name (or CSV of column names) to show within the interface
* `visible_column_template`: Handlebars template notation for the fields to show in results. Eg: `{{first_name}} {{last_name}}`. All columns used here must be added to `visible_columns`
* `add_button`: Toggles an "Add" button for adding new items directly into the Interface
* `choose_button`: Toggles a "Choose" button that opens a modal with existing table items to choose from
* `remove_button`: Toggles "Remove" buttons for each item that let's you delete it
* `filter_type`: You have two options for how to filter this relational column from the Item Listing page depending on the size of your dataset:
	* Dropdown: For small datasets, this gives a dropdown for easy filtering
	* Text Input: For larger datasets, this open field let's you filter by typing
* `filter_column`: The column who's value is used for filtering
* `min_entries`: Sets a minimum number of items that need to be added for this field to validate
* `no_duplicates`: If enabled, items already linked will not show up in the Choose Item listing modal


### Many-to-One (M2O)
*Supported Datatypes: `INT`, `TINYINT`, `SMALLINT`, `MEDIUMINT`, `BIGINT`*

This is a M2O relational Interface drop-down that links to a single item by storing the related item's primary key in the column – which is why this Interface only works with the INT datatype (also used for IDs). You could use this to relate each item in your `press` table to a `project`, or to relate

* `read_only`: Force this interface to be read only
* `visible_column`: A column name (or CSV of column names) to show within the interface
* `visible_column_template`: Handlebars template notation for the fields to show in results. Eg: `{{first_name}} {{last_name}}`. All columns used here must be added to `visible_columns`
* `visible_status_ids`: The values of the status column that will be shown/allowed in this Interface. If the related table has a status column the default values are: `0 = deleted`, `1 = active`, `2 = draft`
* `result_limit`: Maximum number of results to fetch
* `placeholder`: Grayed out default placeholder text in the input when it's empty
* `allow_null`: Allow this field to save `null` as value
* `filter_type`: You have two options for how to filter this relational column from the Item Listing page depending on the size of your dataset:
	* Dropdown: For small datasets, this gives a dropdown for easy filtering
	* Text Input: For larger datasets, this open field let's you filter by typing
* `filter_column`: The column who's value is used for filtering


## Many-to-One Type-Ahead
*Supported Datatypes: `INT`*

Similar to the `many-to-one` in function, the interface for this Interface is a type-ahead (live search auto-complete) which is useful for large relational datasets that won't fit into a dropdown.

* `read_only`: Force this interface to be read only
* `visible_column`: The column name used to search and show for items
* `template`: Handlebars template for displaying the items
* `size`: Adjusts the max width of the input (Small, Medium, Large)
* `visible_status_ids`: The values of the status column that will be shown/allowed in this Interface. If the related table has a status column the default values are: `0 = deleted`, `1 = active`, `2 = draft`

## One-to-Many (O2M)
*Supported Datatypes: **`ONETOMANY` (an alias datatype)***

Similar to Many-to-One, this Interface is an interface for the opposite direction. Instead of saving the `id` of a related item in an actual column, the One-to-Many is an Alias column that saves a FK on the related items.

* `visible_columns`: Which columns to show for related items
* `result_limit`: A maximum number of results to be returned before truncating results
* `add_button`: Toggles an "Add" button for adding new items directly into the Interface
* `choose_button`: Toggles a "Choose" button for finding and selecting existing related items
* `remove_button`: Toggles "Remove" buttons for each item that let's you delete it (see below)
* `only_unassigned`: Toggles if you can choose any existing related items (reassigns ID when saving), or only ones not assigned to other items (already have an ID)

_When deleting these related O2M items, the following rules apply to the related table:_
* **HAS STATUS COLUMN + FK ALLOW NULL**
    * Status = NO CHANGE (SAME STATUS), FK = NULL
* **HAS STATUS COLUMN + FK DOESN'T ALLOW NULL**
    * Status = 0 (SOFT DELETE), FK = NO CHANGE (SAME ID)
* **NO STATUS COLUMN + FK ALLOW NULL**
    * FK = NULL
* **NO STATUS COLUMN + FK DOESN'T ALLOW NULL**
    * HARD DELETE ROW (PERMANENT)


## Translation (O2M)
*Supported Datatypes: `ONETOMANY` (an alias datatype)*

This relational Interface allows for field translations to be stored in a related table. For example, if you have a `projects` table you could create a `projects_translations` table to relationally store the `name` and `description` columns in other languages. Some data, such as `hero_image` or `featured` may not need to be translated and can be added directly to the `projects` table.

> **Warning:** There's a known issue where the translation Interface will stop working if you add Interfaces/Relationships to the junction table columns.

> *Note:* For more information about setting up the translations interface, checkout this [Medium article on the subject](https://medium.com/directus/multilingual-content-setup-in-directus-i18n-4f243f72e554).
