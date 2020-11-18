# Get Column

> **Note:** Table names are case-sensitive

<span class="request">`GET` **/api/1.1/tables/_[table-name]_/columns/_[column-name]_**</span>

<span class="description">Get the system and schema information for a column within a specific table</span>

<span class="arguments">Name</span> | Value | Description
------------------ | ----- | -----------
**table-name** _String_             | <span class="required">Required</span>    | The name of the table that contains the column to get the information from
**column-name** _String_            | <span class="required">Required</span>    | The name of the column you wish to get the information

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/tables/projects/columns/title \
        -u [user-token]:
```

```php
$column = $client->getColumn('projects', 'title');
```

```javascript
client.getColumn('projects', 'title');
```

## Response

<span class="attributes">Attribute</span> | Description
-------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
**data** _Column Object_ | <span class="custom">This data and its architecture is based on Directus columns's schema</span> [**Column Object**: View Nested Attributes](/overview/objects-model.md#column-object)

### Example Response

```json
{
  "meta": {
    "type": "item",
    "table": "directus_columns"
  },
  "data": {
    "id": "title",
    "column_name": "title",
    "type": "VARCHAR",
    "char_length": "100",
    "is_nullable": "YES",
    "comment": "",
    "sort": 2,
    "system": false,
    "master": false,
    "hidden_list": false,
    "hidden_input": false,
    "required": false,
    "column_type": "varchar(100)",
    "is_writable": true,
    "ui": "textinput",
    "options": []
  }
}
```
