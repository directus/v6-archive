# Get Table

> **Note:** Table names are case-sensitive

<span class="request">`GET` **/api/1.1/tables/_[table-name]_**</span>

<span class="description">Get system and schema information for a specific table</span>

<span class="arguments">Name</span> | Value | Description
------------------ | ----- | -----------
**table-name** _String_  |  <span class="required">Required</span>  |  The table name you wish to get the information from
**include_columns** _Boolean_  |  <span class="default">Default **true**</span>  |  Include the table columns information @TODO Not available yet
**include_preferences**  _Boolean_ |  <span class="default">Default **true**</span>  |  Include the table preferences @TODO Not available yet

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/tables/projects \
        -u [user-token]:
```

```php
$table = $client->getTable('projects');
```

```javascript
client.getTable('projects');
```

## Response

<span class="attributes">Attribute</span> | Description
------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
<span class="custom">**data**</span> _Table Object_ | <span class="custom">This data and its architecture is based on Directus table schema</span> [**Table Object**: View Nested Attributes](/overview/objects-model.md#table-object)

### Example Response

```json
{
  "meta": {
    "type": "item",
    "table": "directus_tables"
  },
  "data": {
    "id":"projects",
    "table_name":"projects",
    "date_created":"2016-01-15 02:20:45",
    "comment":"",
    "hidden":false,
    "single":false,
    "is_junction_table":false,
    "user_create_column":null,
    "user_update_column":null,
    "date_create_column":null,
    "date_update_column":null,
    "footer":false,
    "columns":[
      {
         "id":"id",
         "column_name":"id",
         "type":"INT",
         "is_nullable":"NO",
         "comment":"",
         "sort":1,
         "system":true,
         "master":false,
         "hidden_list":false,
         "hidden_input":false,
         "required":true,
         "column_type":"int(11) unsigned",
         "is_writable":true,
         "ui":"numeric",
         "hidden":true,
         "options":[
             ...
         ]
      },
      {
         "id":"active",
         "column_name":"active",
         "type":"TINYINT",
         "is_nullable":"YES",
         "default_value":"2",
         "comment":"",
         "sort":2,
         "system":true,
         "master":false,
         "hidden_list":false,
         "hidden_input":false,
         "required":false,
         "column_type":"tinyint(1) unsigned",
         "is_writable":true,
         "ui":"checkbox",
         "hidden":true,
         "options":[
             ...
         ]
      }
    ],
    "preferences":{
      "user":"1",
      "columns_visible":"",
      "table_name":"projects",
      "title":null,
      "sort":"id",
      "sort_order":"ASC",
      "active":"1,2"
    }
 }
}
```
