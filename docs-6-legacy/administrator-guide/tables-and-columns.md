# Tables & Columns

## Existing Databases
One key benefit to Directus is that it can manage existing databases with custom architectures. This page outlines the few requirements and guidelines for new or existing schemas to work properly within Directus. We're working to remove these, allowing for complete flexibility.


## Table & Column Naming
Directus uses your table and field names for presentation to the users, so it's important to ensure they make sense when formatted and read by users. Below is the automatic formatting performed to convert schema names to display names:

* Underscores become spaces
* Each word is capitalized (edge-cases are handled by an array of overrides)
* "_id" is removed from the end of column names
* System tables (prepended with `directus_`) are hidden

*Examples of proper formatting:*

* `publish_date` becomes "Publish Date"
* `employee_number` becomes "Employee Number"
* `faq_and_support` becomes "FAQ and Support"

*Examples of improper formatting:*

* `pubDate` becomes "Pubdate"
* `EmpNo` becomes "Empno"
* `FaqSupport` becomes "Faqsupport"


## Creating New Tables

#### Name
See *Table & Column Naming* above

#### Display Template
@TODO

#### Columns
See *Creating New Columns* below

#### Listing Views
@TODO

#### Hide Table
This toggle will hide the table throughout the system.

#### Single Item
While not a traditional way to architect a database, sometimes you may find yourself with a table intended to contain only a single item/record. Perhaps you want to manage the content for your project's "About" page with the fields: `title`, `hero_image`, and `company_description`. Any table marked as "single" will skip the _Item Listing_ page and take users directly to the _Edit Item_ page. 

> **Note:** The single managed item should have an ID of `1`

#### Primary Key
Currently Directus requires that every table contains a unique, auto-incremented, primary key named `id`.

*Primary Key Example:*

```SQL
`id` int(11) unsigned NOT NULL AUTO_INCREMENT
```

> The abstracting/decoupling of this column name is under development.

#### Sort Column
Adding a `sort(INT11)` column to a table turns on Directus' drag-and-drop sorting. Items on the Directus listing page will now have handles for dragging them into curated orders. When sorted, Directus will save ascending integers into the order field, thereby making it easy to return results in this order:

> **Developer Note:** It is important when fetching data for your project to honor the sorting of items as needed. This can be accomplished by adding `ORDER BY sort ASC` to SQL queries.

> **Developer Note:** Dragging items within long lists can be difficult – it is not advisable to use the manual sort feature on tables with many items.

#### Status Column
Adding an `active(INT11)` (default name) column enables "soft" deleting and "status" states for items within the table. A status could be used in many different ways, the default is: *Published*, *Draft*, or *Deleted* but you can customize this as needed in the [`/api/configuration.php`](https://github.com/directus/directus/blob/master/api/configuration_sample.php#L137-L171) file.

> **Developer Note:** It is important when fetching data for your project to honor the status of items. Typically this means only fetching published content. Assuming you are using the default Status options, that would mean limiting all SQL queries with: ```active = '1'```

#### Status Mapping
By default, Directus comes with a pre-defined set of item statuses: Deleted, Published and Draft. If you'd like to add additional statuses, or replace the default ones alltogether, you can modify the statuses in the [`/api/configuration.php`](https://github.com/directus/directus/blob/master/api/configuration_sample.php#L137-L171) file.


#### Accountability
While Directus uses the `directus_activity` table to store users/dates for creation/modification – you can also have it save these details into the actual table.

*Below is an example SQL query for generating a simple table that considers these guidelines:*

```SQL
CREATE TABLE `articles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) unsigned DEFAULT '2',
  `sort` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `article` text,
  `publish_date` datetime DEFAULT NULL,
  `author` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

## Deleting Tables
@TODO


## Creating New Columns

#### Name (Database)
@TODO (Strict Naming Toggle)

See *Table & Column Naming* above

#### Name (Display)
@TODO

See *Table & Column Naming* above

#### Comment
You can add helpful notes to your interfaces (shown just below the label) to add clarity or further instructions. Notes default to the columns comment in the database, but those can be overridden within *Settings > Tables & Inputs*.

#### User Interface
@TODO

#### Datatype
Directus uses each column's datatype to determine which Interfaces are allowed. The most common Core interface is chosen as a default, but you can change this within *Settings > Tables & Inputs*. Below are a few examples of how datatypes influence the interface:

* `VARCHAR(200)` – By default this would be a regular text field with a input countdown of remaining characters (UI: TEXT INPUT), but you could change it to a select dropdown of text options (UI: SELECT).
* `TINYINT(1)` – By default this would be a checkbox (`0` or `1`) (UI: CHECKBOX), but you could change it to a single number input (UI: NUMERIC).
* `TEXT` – By default this is a simple text area (UI: TEXT AREA), but you could change it to a rich-tect editor (UI: WYSIWYG).
* `DATETIME` – By default this will show an HTML5 date and time inputs (UI: DATETIME), but you could change it to track the last Directus user to save this item (UI: DIRECTUS USER).

#### Length
@TODO

#### Default
Directus uses your database's column defaults for interfaces. For example, if a `TINYINT` has a default value of `1` the checkbox interface will be checked by default. When used in conjunction with the Status column you can choose a default state for items (eg: Draft).

#### Relationship
@TODO

### Required Columns
If selected, this field name will display an asterisk and be required to save the item.

### Hidden Columns
This toggle will hide the column throughout the system. For more control, use Column Permissions.

### Reordering Columns
By default Directus will display interfaces in the same order as the database columns, however this can be overridden within *Directus Settings > Tables & Inputs*. The reason we don't alter the column order within the database itself when changing input order is because some database optimization involves the specific ordering of the fields.

## Deleting Columns
@TODO

