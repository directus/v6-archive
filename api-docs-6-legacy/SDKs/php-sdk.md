
# Creating Data

Method                  | Parameters             | Description
----------------------- | ---------------------- | -----------
**createItem**              | `table`, `data`        | Creates a new item within the given table
**~~createActivity~~**      | `data`                 | Creates an activity log
**createBookmark**          | `data`                 | Creates a bookmark
**createColumn**            | `data`                 | Creates a new column
**createFile**              | `data`                 | Creates a new file
**createGroup**             | `data`                 | Creates a new group
**createMessage**           | `data`                 | Creates/Sends a new message
**sendMessage**             | `data`                 | `createMessage` alias
**createPreferences**       | `data`                 | Creates a table preferences
**createPrivileges**        | `data`                 | Creates a table privileges (Permissions)
**createSettings**          | `data`                 | Creates a new setting
**createTable**             | `name`, `params`       | Creates a new table
**createUIOptions**         | `data`                 | Creates a new UI options
**createUser**              | `data`                 | Creates a new user

## Create Item

Parameter    | Type    | Description
------------- | ------- | -----------
**table**         | String  | The Table name where the `data` are going to be inserted
**data**          | Array   | Data to be inserted in `table`. All this data attributes will depend on your table columns

### Returns

An Item object containing the new created item.

### Example Request

```php
$article = $client->createItem('articles', [
  'title' => 'New Article',
  'body' => 'Some text'
]);

// echo $article->title;
```

## Create Bookmark

Column                  |  Type    | Description
----------------------- | -------- | ----------------------
**table_name**              | String   | Bookmark Table name
**title**                   | String   | Bookmark title
**columns_visible**         | String   | List of column separated by comma
**search_string**           | String   | List of filters separated by comma. Format `column:operator:value`
**sort**                    | String   | Sort column
**sort_order**              | String   | Sort column order. (`ASC` or `DESC`)
**status**                  | String   | List of status separated by comma

### Returns

An Entry object containing the new bookmark created.

### Example Request

```php
$bookmark = $client->createBookmark([
  'title' => 'Draft Articles',
  'table_name' => 'articles',
  'status' => '2'
]);

// echo $bookmark->title;
```

## Create Column

Column                  | Type      | Description
----------------------- | --------- | ------------
**name**                    | String    | Column name
**table**                   | String    | Table name
**type**                    | String    | Data type
**ui**                      | String    | UI name
**hidden_input**            | Boolean   | Whether the column will be hidden in the edit form
**hidden_list**             | Boolean   | Whether the column will be hidden in the list page
**required**                | Boolean   | Whether the column is required
**sort**                    | String    | Sort position in number
**comment**                 | String    | Note on the column
**relationship_type**       | String    | Column relationship type, `ONETOMANY`, `MANYTOMANY` or `MANYTOONE`
**related_table**           | String    | The table name this column is related to
**junction_table**          | String    | The pivot/junction table that joins the column's table with the related table
**junction_key_left**       | String    | The column name in junction that is related to the column's table
**junction_key_right**      | String    | The column name in junction that is related to the related table

**@TODO** Make most of the attributes "guessed/automated", for example `single_ui` should should has `related_table` to `directus_files` and `junction_key_right` to the same column name.

### Example Request

```php
$column = $client->createColumn([
    'name' => 'title',
    'table' => 'articles',
    'type' => 'varchar',
    'ui' => 'textinput',
    'length' => 255
]);
```

```php
$column = $client->createColumn([
    'name' => 'image',
    'table' => 'articles',
    'type' => 'int',
    'ui' => 'single_file',
    'related_table' => 'directus_files',
    'junction_key_right' => 'image' // same as the title
]);
```

```php
$column = $client->createColumn([
    'name' => 'posts',
    'table' => 'authors',
    'type' => 'ALIAS',
    'ui' => 'one_to_many',
    'relationship_type' => 'ONETOMANY',
    'related_table' => 'articles',
    'junction_key_right' => 'author'
]);
```

## Create Group

Column                  | Type       | Description
----------------------- | ---------- | --------------------
**name**                | String     | Group name
**restrict_to_ip_whitelist** | String     | List of IPs allowed to authenticate, separated  by comma

### Example Request

```php
$group = $client->createGroup([
    'name' => 'Editors'
]);
```

## Create/Send Messages

Column                  | Type      |  Description
----------------------- | --------- | ----------------------
**from**                    | Integer   | Sender user id
**to**                      | Array     | List of users id, separated by comma
**toGroup**                 | Array     | List of groups id, separated by comma
**subject**                 | String    | Message subject
**message**                 | String    | Message content
**attachments**             | Array     | **@TODO** List of files to add to the message

**@TODO** Send/Create responses without the need to specify each recipients.

### Returns

Entry object containing the new created message.

### Example Requests

Sending message to two users.
```php
$message = $client->createMessage([
    'from' => 1,
    'to' => [2, 5],
    'subject' => 'New Design review',
    'message' => 'I want some feedback on this new design.'
]);
```

Sending message to two groups.
```php
// same as createMessage
$message = $client->sendMessage([
    'from' => 1,
    'toGroup' => [1, 3], // 1 = Administrator, 3 = Editors
    'subject' => 'Tomorrow Meeting',
    'message' => 'I want to you all know that tomorrow meeting was cancelled.'
]);
```

### Message Item Attributes

Attribute               | Type      | Description
----------------------- | --------- | ----------------------
**id**                      | Integer   | Message ID
**from**                    | Integer   | Sender ID
**recipients**              | String    | List of Recipients separated by comma. **@TODO**: it should be an array
**subject**                 | String    | Message subject
**responses**               | Array     | List of responses messages
**response_to**             | Integer   | Parent message (replied to this message id)
**read**                    | Integer   | Whether the message was read by the authenticated user. **@TODO** It should be bool


## Create Preferences

Column                  | Type      | Description
----------------------- | --------- | ----------------------
**user**                    | Integer   | User ID that this preferences belongs to
**table_name**              | String    | Table name that this preferences belongs to
**columns_visible**         | String    | List of visible column separated by comma
**sort**                    | String    | Sort column
**sort_order**              | String    | Sort column order. `ASC` or `DESC`
**status**                  | String    | List of status separated by comma

### Returns

An `Entry` object containing the new preference created.

### Example Request

```php
$preference = $client->createPreferences([
  'user' => 1,
  'table_name' => 'articles',
  'columns_visible' => 'title,content,author,published_date'
  'status' => '2'
]);

// echo $preference->columns_visible;

```

## Create Privileges

Column                  | Type      | Description
----------------------- | --------- | ----------------------
**group_id**                | Integer   | Group ID
**table_name**              | String    | Table name that these privileges belong to
**allow_add**               | Integer   | Allow to add/create items in the table:<br> `0` (None), `1` (Add)
**allow_edit**              | Integer   | Allow to edit/update items in the table:<br> `0` (None), `1` (Edit Mine), `2` (Edit All)
**allow_delete**            | Integer   | Allow to delete/remove items in the table:<br> `0` (None), `1` (Delete Mine), `2` (Delete All)
**allow_view**              | Integer   | Allow to view/read items in the table:<br> `0` (None), `1` (View Mine), `2` (View All)
**allow_alter**             | Integer   | Allow to add/create items in the table:<br> `0` (None), `1` (Alter)
**nav_listed**              | Boolean   | Whether the table should be visible in the sidebar or not
**read_field_blacklist**    | String    | CSV of columns that the group can't view/read
**write_field_blacklist**   | String    | CSV of columns that the group can't edit/update
**status_id**           | String    | State of the record that these privileges belongs to. eg: Interns can edit Drafts, but only view Published items

### Returns

An `Entry` object containing the new privileges created.

### Example Request

```php
$privileges = $client->createPrivileges([
  'group_id' => 2,
  'table_name' => 'articles',
  'allow_edit' => 2,
  'allow_delete' => 0,
  'write_field_blacklist' => 'title,published_date'
]);

// echo $privileges->allow_edit;

```

## Create Table

Parameter              | Type      | Description
----------------------- | --------- | ----------------------
**name**                    | String    | New table name
**data**                | Array     | Not defined yet

### Returns

An Entry (Item) object containing the new table created privileges.

### Example Request

```php
$privileges = $client->createTable('comments');

// echo $privileges->allow_edit;

```

## Create Column Options

Column                  | Type      | Description
----------------------- | --------- | ----------------------
**column**                  | String    | Column name
**table**                   | String    | Column table name
**ui**                      | String    | Column UI name
**options**                 | Array     | UI Options

### Returns

`Entry` object containing all the column options.

### Example Request

```php
$options = $client->createColumnUIOptions([
    'column' => 'slug',
    'table' => 'articles',
    'ui' => 'textinput',
    'options' => [
        'readonly' => 1,
        'placeholder' => 'Title slug'
    ]
]);

// echo $options->placeholder;
```

## Create User

Column                  | Type      | Description
----------------------- | --------- | ----------------------
**active**                  | Integer   | User's status. By default `1=active, 2-inactive, 3=deleted`
**email** `Required`        | String    | User's unique email address
**first_name**              | String    | User first name
**last_name**               | String    | User last name
**password**                | String    | Plain text password
**token**                   | String    | User's unique API access token
**group**                   | Integer   | User's group ID
**email_messages**          | Boolean   | Whether the user wants to receive email notification
**avatar**                  | String    | Avatar url
**avatar_file_id**          | Integer   | Use a file id as avatar
**language**                | String    | User's default language. Language Supported `en` (English), `es` (Spanish), `de` (German), `fr` (French), `it` (Italian), `zh-hans` (Simplified Chinese) and `nl` (Dutch)
**timezone**                | String    | User's default timezone
**position**                | String    | User's position on the project/company
**location**                | String    | User's location in the world or universe
**phone**                   | String    | User's phone number
**address**                 | String    | User's address
**city**                    | String    | User's city
**state**                   | String    | User's state
**zip**                     | String    | User's zip code

### Returns

An `Entry` object containing the new created user.

### Example Request

```php
$user = $client->createUser([
  'email' => 'user@website.local',
  'first_name' => 'John',
  'last_name' => 'Bohannon',
  'password' => 'plain-text-password',
  'token' => 'secret-token'
]);

// echo $user->email;
// @TODO: echo $user->getEmail(); (UserEntry Object)

```

### User Item Attributes

Column                  | Type      | Description
----------------------- | --------- | ----------------------
**id**                      | Integer   | User ID
**active**                  | Integer   | User's status. `1=active, 2=inactive, 3=deleted`
**email**                   | String    | User's unique email address
**first_name**              | String    | User first name
**last_name**               | String    | User last name
**password**                | String    | hashed password **IS THIS NEEDED?**
**token**                   | String    | User's unique API access token
**group**                   | Integer   | User's group ID
**email_messages**          | Boolean   | Whether the user wants to receive email notification
**avatar**                  | String    | Avatar url
**avatar_file_id**          | Integer   | File id used as avatar
**language**                | String    | User's default language. Languages Supported `en` (English), `es` (Spanish), `de` (German), `fr` (French), `it` (Italian), `zh-hans` (Simplified Chinese) and `nl` (Dutch)
**timezone**                | String    | User's default timezone
**position**                | String    | User's position on the project/company
**location**                | String    | User's location in the world or universe
**phone**                   | String    | User's phone number
**address**                 | String    | User's address
**city**                    | String    | User's city
**state**                   | String    | User's state
**zip**                     | String    | User's zip code


## Create File

Parameter              | Type     | Description
----------------------- | -------- | ---------------------------
file                    | File     | New file

File Parameter         | Type     | Description
----------------------- | --------------------------------------
**path** `Required`         | String   | Local path of the file.
**url** (@TODO)        | String   | URL of the file to upload, OR a YouTube/Vimeo link to be embedded
**title**                   | String   | File's title
**tags**                    | String   | Comma separated tags
**caption**                 | String   | File caption (Description)

### Returns

An `Entry` object containing the new created file.

**@TODO** Returns a `FileEntry` Object.

### Example Request

```php
// From a local file
$file = $client->createFile(new File('/path/to/the/file.jpg', [
  'title' => 'Company Group picture',
  'tags' => 'company, employees, team',
  'caption' => 'Whole company at Christmas party'
]);

// echo '<h1>' . $file->title . '</h1>;
// echo '<p>' . $file->caption . '</p>';
// echo '<img src="' . $client->getBaseUrl() . $file->url . '">';
// @TODO: $file->getTitle();

```

**@TODO**
 - Create file from a url


### File Object Attributes

Column                  | Type     | Description
----------------------- | -------- | ----------------------
**id**                      | Integer  | File ID
**active**                  | Integer  | File's status. `1=active, 2=inactive, 3=deleted`
**name**                    | String   | File name
**title**                   | String   | File's title
**location**                | String   | Location of where the picture was taken (if any)
**type**                    | String   | File mime type
**url**                     | String   | File url relativity to Directus base url
**tags**                    | String   | Comma separated tags
**caption**                 | String   | File caption (Description)
**width**                   | Integer  | File width
**height**                  | Integer  | File height
**size**                    | Integer  | File size in bytes
**embed_id**                | String   | ID of the embedded file. Ex Youtube ID
**user**                    | Integer  | File owner (who uploaded the file)
**date_uploaded**           | String   | File uploaded date **@TODO** It should be an DateTime object
**storage_adapter**         | String   | Storage adapter used to upload the file


---

# Getting Data

Method                  | Parameter              | Description
----------------------- | ---------------------- | -----------
**getActivity**             | `params`               | Get Directus Activity
**getItems**                | `table`, `params`      | Collection of rows (items) for a given table
**getItem**                 | `table`, `id`, `params`| Details for a specific table row (item)
**getUsers**                | `params`               | Collection of users
**getUser**                 | `id`, `params`         | Details for a specific user
**getFiles**                | `params`               | Collection of files
**getFile**                 | `id`, `params`         | Details for a specific file
**getGroups**               | `params`               | Collection of all Directus user-groups
**getGroup**                | `id`, `params`         | Details for a specific user-group
**getGroupPrivileges**      | `group_id`             | Privileges for a given user-group
**getSettings**             | None                   | All Directus Setting
**getSettingsByCollection** | `collection`           | All Directus Settings in a given collection
**getMessages**             | `user`                 | Collection of messages
**getMessage**              | `id`                   | Details for a specific message
**getTables**               | `params`               | Collection of tables viewable by authenticated user
**getTable**                | `table`                | Collection of latest Directus activity
**getColumns**              | `table`, `params`      | Collection of the column details for a given table
**getColumn**               | `table`, `column`      | Details for a specific column in a given table

**@TODO**: More helpers
- Directus Preferences

### Returns

An `Entry` or `EntryCollection` object containing the fetched data.

## Get Activity

Parameter    | Type    | Description
------------- | ------- | -----------
**params**        | Array   | Customizable options

### Example Request

```php
$activities = $client->getActivity([
  'filters' => [
    'table_name' => 'articles'
  ]
]);

foreach($activities as $activity) {
  echo $activity->action;
}
```

## Get Items

Parameter    | Type    | Description
------------- | ------- | -----------
**table**         | String  | The Table name to fetch data from
**params**        | Array   | Customizable options

### Example Request

```php
$articles = $client->getItems('articles');

foreach($articles as $article) {
  echo $article->title;
}
```

## Get Item by ID

Parameter    | Type    | Description
------------- | ------- | -----------
**table**         | String  | The Table name to fetch data from
**id**            | Mixed   | The record id

### Example Request

```php
$article = $client->getItem('articles', 1);
echo $article->title;
```

## Get Users

Parameter    | Type    | Description
------------- | ------- | -----------
**params**        | Array   | Customizable options

### Example Request

```php
$users = $client->getUsers([
  'order' => ['email' => 'ASC']
]);

foreach($users as $user) {
  echo $user->email;
}
```

## Get User by ID

Parameter    | Type    | Description
------------- | ------- | -----------
**id**            | Integer | The user id

### Example Request

```php
$user = $client->getUser(1);
echo $user->email;
```

**@TODO**

### Returns

An `UserEntry` object containing the user information.

## Get Files

Parameter    | Type    | Description
------------- | ------- | -----------
**params**        | Array   | Customizable options

### Example Request

```php
$files = $client->getFiles([
  'order' => ['size' => 'DESC']
]);

foreach($files as $file) {
  echo $file->email;
}
```

## Get File by ID

Parameter    | Type    | Description
------------- | ------- | -----------
**id**            | Integer | The file

### Example Request

```php
$file = $client->getFile(1);
echo $file->name;
```

**@TODO**

### Returns

A `FileEntry` object containing the file information.

## Get Groups

Parameter    | Type    | Description
------------- | ------- | -----------
**params**        | Array   | Customizable options

### Example Request

```php
$groups = $client->getGroups([
  'order' => ['name' => 'ASC']
]);

foreach($groups as $group) {
  echo $group->name;
}
```

## Get Group by ID

Parameter    | Type    | Description
------------- | ------- | -----------
**id**            | Integer | The group id

### Example Request

```php
$group = $client->getGroup(1);
echo $group->name;
```

**@TODO**

### Returns

A `GroupEntry` object containing the group information.

## Get Group Privileges

Parameter    | Type    | Description
------------- | ------- | -----------
**id**            | Integer | The group id

### Example Request

```php
$privileges = $client->getGroupsPrivileges(1);

foreach($privileges as $privilege) {
  echo $privilege->table_name;
  echo $privilege->allow_view;
}
```

## Get Settings

Parameter    | Type    | Description
------------- | ------- | -----------
None          |         |

### Example Request

```php
$settings = $client->getSettings();
echo $settings->global->project_name
```

**@TODO**

### Returns

A `SettingEntry` object containing the setting information.

## Get Settings by Collection

Parameter    | Type    | Description
------------- | ------- | -----------
**collection**    | String  | Name of the collection

### Example Request

```php
$settings = $client->getSettingsByCollection('global');
echo $settings->project_name
```

## Get Messages

Parameter    | Type    | Description
------------ | ------- | -----------
userId       | Integer | User ID messages list

```php
// Using the API Client it's going to be default to the authenticated user.
$messages = $client->getMessages(1);
```

## Get Message

Parameter    | Type    | Description
------------ | ------- | -----------
**id**       | Integer | The message id
**user**     | Integer | The user id (only for db connection)

```php
$message = $client->getMessage(1);
```

## Get Tables

Parameter    | Type    | Description
------------- | ------- | -----------
**params**        | Array   | Customizable options

### Example Request

```php
$tables = $client->getTables([
  'include_system' => 1
]);

foreach($tables as $table) {
  echo $table->name;
}
```

**Params**

Parameter    | Type    | Description
------------- | ------- | -----------
**include_system**| Boolean | Include the core tables

## Get Table

Parameter    | Type    | Description
------------- | ------- | -----------
**table**         | String  | The Table name
**params**        | Array   | Customizable options

### Example Request

```php
$table = $client->getTable('directus_groups');
echo $table->name;
```

## Get Table Columns

Parameter    | Type    | Description
------------- | ------- | -----------
**table**         | String  | The Table name
**params**        | Array   | Customizable options

### Example Request

```php
$columns = $client->getTableColumns('articles');

foreach($columns as $column) {
  echo $column->name;
}
```

## Get Table Column

Parameter    | Type    | Description
------------- | ------- | -----------
**table**         | String  | The Table name
**column**        | String  | The column name

### Example Request

```php
$column = $client->getTableColumn('articles', 'title');
$isRequired = $column->required;
```

### Returns

A `Entry` object containing the setting information.

# Get Parameters

Some methods accepts parameters to alter/filter the collection result.

## order

Sort the result by one or more columns.

### Example Request

```php
$params = [
  'order' => [
    'id' => 'ASC',
    'title' => 'DESC'
  ]
];

$articles = $client->getItems('articles', $params);
```
## orderBy

Sort by only one column.

### Example Request

```php
$params = [
  'orderBy' => 'title'
];

$articles = $client->getItems('articles', $params);
```

## orderDirection

Sort `orderBy` in this direction. `ASC` or `DESC`. Default to `ASC`.

### Example Request

```php
$params = [
  'orderBy' => 'title',
  'orderDirection' => 'DESC'
];

$articles = $client->getItems('articles', $params);
```

## limit

Limit the numbers of records to be returned.

### Example Request

```php
$params = [
  'limit' => 100
];

$articles = $client->getItems('articles', $params);
```

## offset

Skip this many rows.

### Example Request

```php
$params = [
  'limit' => 100,
  'offset' => 50
];

$articles = $client->getItems('articles', $params);
```

## status

Return only records that has this status. To include multiple status, it has to be separated by comma.

### Example Request

```php
$params = [
  'status' => [1, 2]
];

$articles = $client->getItems('articles', $params);
```

## ids

A comma-separated list of IDs.

### Example Request

```php
$params = [
   'ids' => [2, 4, 11]
];

$articles = $client->getItems('articles', $params);
```

## filters

Filter the request by using any of the supported operators.

### Example Request

```php
$params = [
  'filters' => [
    'column_name' => ['operator' => 'value']
  ]
];

$articles = $client->getItems('articles, [
  'filters' => ['title' => ['like' => 'movies']]
]);

// Not using a `operator` is default to equal to.
$articles = $client->getItems('articles, [
  'filters' => ['slug' => 'lorem-ipsum']
]);
```

### Supported Operators

Operator                | Description
----------------------- | ----------------------
`=`, `eq`, _None_       | Equal to
`<>`, `!=`, `neq`       | Not Equal to
`<`, `lt`               | Less than
`<=`, `lte`             | Less than or equal to
`>`, `gt`               | Greater than
`>=`, `gte`             | Greater than or equal to
`in`                    | Match one of the value in the list
`nin`                   | Not match any value in the list
`null`                  | Is Null
**nnull** (@TODO)      | Is Not Null
**contains** (@TODO)   | Contains a string
**ncontains** (@TODO)  | Not Contains a string
**between** (@TODO)    | Is Between
**empty** (@TODO)      | Is Empty
**nempty** (@TODO)     | Is Not Empty
**has** (@TODO)        | Has one or more related items

---

# Updating data

Method                  | Parameter             | Description
----------------------- | ---------------------- | -----------
**updateItem**             | `table`, `id`, `data`  | Updates the record with the given `id` in `table` with `data`
**updateUser**              | `id`, `data`           | Updates the given user `id` with the given `data`
**updateFile**              | `id`, `data`           | Updates the give file `id` with the given `data`

**@TODO** More helpers
- Directus Groups
- Directus Privileges
- Directus Preferences
- Directus Settings

### Returns

An `Entry` object containing the updated data.

## Update Item

Parameter    | Type    | Description
------------- | ------- | -----------
**table**         | String  | The Table name
**id**            | Mixed   | The id of the record to update
**data**          | Array   | Data to update

## Update User

Parameter    | Type    | Description
------------- | ------- | -----------
**id**            | Integer | The id of the user to update
**data**          | Array   | Data to update

### User Data

Column                  | Type    | Description
----------------------- | ------- | ----------------------
**active**                  | Integer | User's status. By default `1=active, 2-inactive, 3=deleted`
**email** `Required`        | String  | User's unique email address
**first_name**              | String  | User first name
**last_name**               | String  | User last name
**password**                | String  | Plain text password, will be hashed on the server side
**token**                   | String  | User's unique API access token
**group**                   | Integer | User's group ID
**email_messages**          | Integer | Whether the user wants to receive email notification.
**avatar**                  | String  | Avatar url
**avatar_file_id**          | Integer | Use a file id as avatar
**language**                | String  | User's default language. Language Supported `en` (English), `es` (Spanish), `de` (German), `fr` (French), `it` (Italian), `zh-hans` (Simplified Chinese) and `nl` (Dutch)
**timezone**                | String  | User's default timezone
**position**                | String  | User's position on the project/company
**location**                | String  | User's location in the world or universe
**phone**                   | String  | User's phone number
**address**                 | String  | User's address
**city**                    | String  | User's city
**state**                   | String  | User's state
**zip**                     | String  | User's zip code

## Update File

Parameter    | Type    | Description
------------- | ------- | -----------
**id**            | Integer | The id of the file to update
**data**          | Array|File | Data to update

### Example Requests

```php
$updatedFile = $client->updateFile(1, ['title' => 'New Design']);

// echo $updatedFile->title;
```

```php
$updatedFile = $client->updateFile(1, new File('/path/to/file'));

// echo $updatedFile->url;
```

---

# Deleting Data

Method                  | Parameter             | Description
----------------------- | ---------------------- | -----------
**deleteItem**             | `table`, `id`          | Deletes the record with the given `id` in `table`
**deleteBookmark**          | `id`                   | Deletes the given bookmark id
**deleteColumn**            | `name`. `table`        | Deletes the tiven column name in the given table name
**deleteFile**              | `id`                   | Deletes the give file `id`
**deleteGroup**             | `id`                   | Creates a new group
**deleteTable**             | `name`                 | Creates a new table
**deleteUser**              | `id`                   | Deletes the given user `id`

### Returns

Nothing is returned.

**@TODO** Return whether or not were deleted.

## Delete Item

Parameter    | Type    | Description
------------- | ------- | -----------
**table**         | String  | The table name
**id**            | Integer | The id of the record to delete in `table`

### Example Request

```php
$client->deleteItem('articles', 1);
```

## Delete Bookmark

Parameter    | Type    | Description
------------- | ------- | -----------
**id**            | Integer | The id of the bookmark to delete

### Example Request

```php
$client->deleteBookmark(1);
```

## Delete Column

Parameter    | Type    | Description
------------- | ------- | -----------
**name**          | String  | The column name to delete
**table**         | String  | The table the colum belongs to

### Example Request

```php
$client->deleteColumn('slug', 'articles');
```

## Delete File

Parameter    | Type    | Description
------------- | ------- | -----------
**id**            | Integer | The id of the file to delete

### Example Request

```php
$client->deleteFile(1);
```

## Delete Group

Parameter    | Type    | Description
------------- | ------- | -----------
**id**            | Integer | The id of the group to delete

### Example Request

```php
$client->deleteGroup(1);
```

## Delete Table

Parameter    | Type    | Description
------------- | ------- | -----------
**name**          | String  | The name of the table to delete

### Example Request

```php
$client->deleteTable('comments');
```

## Delete User

Parameter    | Type    | Description
------------- | ------- | -----------
**id**            | Integer | The id of the user to delete

### Example Request

```php
$client->deleteUser(1);
```
