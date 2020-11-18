# Core Interfaces

User interfaces (Interfaces) are how your users will interact with the different types of content in your database. Each field in your database has a data-type that determines what kind of content can be stored there – Directus uses this information to determine a default Interface and any other Interfaces that are supported. In addition to the provided Core Interfaces, you can also easy create new Custom Interfaces for specific or complex use-cases.

## String based interfaces

### Blob
*Supported Datatypes: `BLOB`, `MEDIUMBLOB`*

A read-only interface which allows you to display your saved `data:` string based files.

### Checkboxes
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`*

Sometimes you don't need to create a dedicated table to house relational  options but you still want to limit the values a user can choose. This Interface will save multiple non-relational values from a set of JSON options. All selections are glued together with a delimiting character.

#### Options
* `read_only`: Force this interface to be read only
* `options`: JSON key-value-pairs where the key is what's saved to the database, and the value is what's shown in the dropdown interface
* `delimiter`: Character which is used to separate the saved values
* `wrap_with_delimiter`: Wrap the saved string with a pair of delimiters to allow strict searching for a single value
* `list_view_formatting`: Set how the value is being displayed in the list views
* `allow_custom_checkboxes`: Allow the user to add an additional 'Custom' value to the list of checkboxes

### Dropdown
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`*

Sometimes you don't need to create a dedicated table to house relational dropdown options but you still want to limit the values a user can choose. This Interface will save a single non-relational value chosen from a set of JSON options.

#### Options
* `read_only`: Force this interface to be read only
* `options`: JSON key-value-pairs where the key is what's saved to the database, and the value is what's shown in the dropdown interface
* `placeholder`: The placeholder value to use
* `use_native_input`: Render the interface as a browser-default select tag instead of our custom implementation
* `list_view_formatting`: Set how the value is being displayed in the list views

### Dropdown ENUM
*Supported Datatype: `ENUM`*

Sometimes you don't need to create a dedicated table to house relational dropdown options but you still want to limit the values a user can choose. This Interface will save a single non-relational value chosen from a set ENUM.

#### Options
* `read_only`: Force this interface to be read only
* `placeholder`: The placeholder value to use
* `use_native_input`: Render the interface as a browser-default select tag instead of our custom implementation

### Dropdown Multiselect
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`*

Sometimes you don't need to create a dedicated table to house relational  options but you still want to limit the values a user can choose. This Interface will save multiple non-relational values from a set of JSON options.

#### Options
* `read_only`: Force this interface to be read only
* `options`: JSON key-value-pairs where the key is what's saved to the database, and the value is what's shown in the dropdown interface
* `placeholder`: The placeholder value to use
* `use_native_input`: Render the interface as a browser-default select tag instead of our custom implementation
* `list_view_formatting`: Set how the value is being displayed in the list views

### Encrypted
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`*

At times, you need to save sensitive data in a safe matter. The encrypted Interface will hash any and every value that is inserted into it.

#### Options
* `read_only`: Force this interface to be read only
* `hide_value`: Displays dots (●) instead of the text you enter
* `placeholder`: The placeholder value to use
* `hashing_type`: Choose which hashing algorithm to use

### JSON
*Supported Datatypes: `TEXT`, `VARCHAR`, `TINYTEXT`, `MEDIUMTEXT`, `LONGTEXT`*

It can be complex to validate and write JSON content by hand. The JSON Interface helps you by validating the input and auto-formatting the input.

#### Options
* `read_only`: Force this interface to be read only
* `indent`: What character(s) to use as indentation
* `rows`: Default height of the interface in amount of rows
* `placeholder`: The placeholder value to use

### Map
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`, `ALIAS`*

The map Interface allows you to select a specific location on a map. The Interface itself will store the latitude and longitude of the location. It also allows you to specify additional columns to save other information to, like city, zip code, and many others.

#### Options
* `read_only`: Force this interface to be read only
* `google_api_key`: Google API Key with Google Maps JS access
* `street_number_field`: Street number column to fill with respective item
* `street_field`: Street column to fill with respective item
* `city_field`: City column to fill with respective item
* `postal_code_field`: Postal code column to fill with respective item
* `state_field`: State column to fill with respective item
* `state_code_field`: State code column to fill with respective item
* `country_field`: Country column to fill with respective item
* `country_code_field`: Country code column to fill with respective item
* `map_height`: Height of the rendered map in pixels
* `show_lat_lng`: Show the latitude and longitude to be saved

### Markdown
*Supported Datatypes: `TEXT`, `VARCHAR`, `TINYTEXT`, `MEDIUMTEXT`, `LONGTEXT`*

The Markdown Interface allows you to edit and live-preview Markdown code.

#### Options
* `read_only`: Force this interface to be read only
* `rows`: Default height of the interface in amount of rows
* `github_flavored_markdown`: Use GitHub flavored markdown when parsing the value
* `tables`: Allow tables to be inserted into the Markdown
* `breaks`: Allow breaks to be inserted into the Markdown
* `sanitize`: Sanitize the user input before saving to prevent [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting)

### Password
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`*

This Interface contains a masked input for entering a password, a second input to confirm the password, a "Generate New" button for optionally generating new secure passwords quickly, and a "Reveal Password" toggle to expose the password to the user in plain-text. This Interface can also be linked to a "salt" column so that the password entered is securely hashed.

#### Options
* `read_only`: Force this interface to be read only
* `require_confirmation`: Render a second textinput to confirm the password
* `salt_field`: The column which hold the value to use as salt

### Radio Buttons
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`*

Sometimes you don't need to create a dedicated table to house relational options but you still want to limit the values a user can choose. This Interface will save a single non-relational value chosen from a set of JSON options.

#### Options
* `read_only`: Force this interface to be read only
* `options`: JSON key-value-pairs where the key is what's saved to the database, and the value is what's shown in the dropdown interface
* `list_view_formatting`: Set how the value is being displayed in the list views
* `allow_custom_value`: Allow the user to add an additional 'Custom' value to the list of radio buttons

### Random
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`*

This Interface will generate a random string which may or may not be overwritten by the user.

#### Options
* `read_only`: Force this interface to be read only
* `string_length`: The length of the random string
* `allow_any_value`: Allow the user to overwrite the random value
* `auto_generate`: Automatically generate a random string
* `placeholder`: The placeholder value to use

### Slug
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`*

Often clean/semantic URLs or other identifiers will include a contextual identifier based on an item's title rather than the `id` alone. This Interface automatically creates that URL-friendly value based on another input. For instance, if linked to the `title` column, as the user types "This, That & the Other!" the `slug` input would live-update to "this-that-the-other".

#### Options
* `read_only`: Force this interface to be read only
* `size`: What width to use for the input
* `mirrored_field`: Column name of the field the slug will pull it\'s value from
* `only_on_creation`: Whether or not to only update the slug field on creation

### Tags
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`*

A system for entering and saving comma-delimited tags – for relational tags use the `many-to-many` UI instead. Tags are entered into the list upon hitting the comma or enter key and are deleted by clicking the tag in the list. The tags are saved into the database as a CSV string with commas at the beginning and end (`,ranger,studio,range,`) which lets you perform powerful `LIKE` filters. For example, by using commas you can filter with `%,range,%` to get results that are exact (does not include "ranger") or `%range%` for inclusive (does include "ranger").

#### Options
* `read_only`: Force this interface to be read only
* `force_lowercase`: Convert all tags to lowercase

### Text Input
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`, `DATE`, `TIME`, `ENUM`*

A simple, basic, single-line text field for almost any kind of string data. The user is shown the remaining character count based on the length property of the column. Despite being so simple, a few key options make this Interface one of the most useful and flexible:

#### Options
* `read_only`: Force this interface to be read only
* `size`: What width to use for the input
* `placeholder`: The placeholder value to use
* `validation_type`: Chooses the type of validation used on this field
	* Character Blacklist: Choose the specific characters **not** allowed in the input
	* Character Whitelist: Choose the specific characters allowed in the input
	* RegEx: Create a regular expression to validate the value. Useful for emails, phone number formatting, or almost anything
* `validation_string`: Holds the CSV list of Whitelist/Blacklist characters or the RegEx value (based on the above option)
* `validation_message`: A message that is shown to the user if the validation fails

### Textarea
*Supported Datatypes: `TEXT`, `VARCHAR`, `TINYTEXT`, `MEDIUMTEXT`, `LONGTEXT`*

A multi-line text field for longer plain-text data. New lines are saved in the database as new lines as this input does not create any HTML tags.

#### Options
* `read_only`: Force this interface to be read only
* `rows`: Default height of the interface in amount of rows
* `placeholder`: The placeholder value to use

### WYSIWYG
*Supported Datatypes: `TEXT`, `VARCHAR`, `TINYTEXT`, `MEDIUMTEXT`, `LONGTEXT`*

A multi-line text field for longer HTML content with a Medium-style WYSIWYG editor. Each formatting button can be toggled on or off as needed.

#### Options
* `read_only`: Force this interface to be read only
* `buttons`: Choose which formatting options to allow the user to choose from
* `simple_editor`: Simplifies the styling of the Interface's input

### WYSIWYG Full
*Supported Datatypes: `TEXT`, `VARCHAR`, `TINYTEXT`, `MEDIUMTEXT`, `LONGTEXT`*

A multi-line text field for longer HTML content with a more feature-rich WYSIWYG editor. Each formatting button can be toggled on or off as needed.

#### Options
* `read_only`: Force this interface to be read only
* `show_element_path`: Show the element path (e.g. "div > p > b")
* `headings`: What heading levels to support
* `inline`: What text-style options to support
* `blocks`: What block-style options to support
* `alignment`: What alignment options to support
* `toolbar_options`: What options to show in the toolbar
* `custom_toolbar_options`: Space separated list of [TinyMCE toolbar controls](https://www.tinymce.com/docs/configure/editor-appearance/#toolbar)
* `custom_wrapper`: Add custom html-element wrapper(s)
* `max_height`: Set the max height the editor will resize to
* `remove_unsafe_tags`: Have the editor remove potentially unsafe tags like iframe and script


## Numeric interfaces

### Color
*Supported Datatypes: `VARCHAR`, `CHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`*

Lets the user select a color from a predefined set or enter a custom value. Supports entering and saving colors in multiple color formats.

#### Options
* `read_only`: Force this interface to be read only
* `input`: The unit in which the user will enter the data
* `output`: The unit in which the data gets saved to the DB
* `list_view_formatting`: Set how the value is being displayed in the list views
* `palette`: Color options for the user to pick from
* `palette_only`: Only allow the user to pick from the palette
* `allow_alpha`: Allow values with an alpha channel

### Numeric
*Supported Datatypes: `INT`, `TINYINT`, `SMALLINT`, `MEDIUMINT`, `BIGINT`, `YEAR`*

Simple Interface which allows you to enter and edit numeric values.

#### Options
* `read_only`: Force this interface to be read only
* `size`: What width to use for the input
* `placeholder`: The placeholder value to use
* `localized`: Whether or not to localized the numeric value, eg: currency format

### Slider
*Supported Datatypes: `INT`, `TINYINT`, `SMALLINT`, `MEDIUMINT`, `BIGINT`*

Allow the user to select a numeric value in a range based on a slider input.

#### Options
* `read_only`: Force this interface to be read only
* `minimum`: Minimum value
* `maximum`: Maximum value
* `step`: Specifies the allowed number intervals
* `unit`: Show unit next to slider value, e.g.: 15 Pounds

### Toggle
*Supported Datatype: `TINYINT`*

Boolean style interface which allows the user to enable or disable a certain thing.

#### Options
* `read_only`: Force this interface to be read only
* `label`: Label to show next to the toggle
* `show_as_checkbox`: Display a checkbox instead of the default switch style input

## Date and Time Interfaces

### Date
*Supported Datatype: `DATE`*

Saves a given or the current date.

#### Options
* `read_only`: Force this interface to be read only
* `format`: What format (e.g. yyyy-mm-dd) to use for the date
* `contextual_date_in_listview`: Show dates in relatively to now (eg: 3 days ago)
* `populate_when_hidden_and_null`: Automatically fill this field with the current date if the input is hidden and empty

### DateTime
*Supported Datatypes: `DATETIME`, `TIMESTAMP`*

Saves a given or the current date & time or just the time.

#### Options
* `read_only`: Force this interface to be read only
* `format`: What format (e.g. yyyy-mm-dd) to use for the date
* `contextual_date_in_listview`: Show dates in relatively to now (eg: 3 days ago)
* `populate_when_hidden_and_null`: Automatically fill this field with the current date if the input is hidden and empty
* `include_seconds`: Include the seconds in the saved value

### Time
*Supported Datatype: `TIME`*

Saves a given or the current time.

#### Options
* `read_only`: Force this interface to be read only
* `include_seconds`: Include the seconds in the saved value
