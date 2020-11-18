# Create Column

> **Note:** Table names are case-sensitive

<span class="request">`POST` **/api/1.1/tables/_[table-name]_/columns**</span>

<span class="description">Create a new column within the specified table</span>

<span class="arguments">Name</span> | Value | Description
------------------ | ----- | -----------
**column_name** _String_             |     | The unique name of the column to create
**table_name** _String_              |     | The table within which the column should be created
**type** _String_                    |     | The datatype of the column, eg: `INT`
**ui** _String_                      |     | The Directus Interface to use for this column
**hidden_input** _Boolean_           |     | Whether the column will be hidden (globally) on the Edit Item page
**hidden_list** _Boolean_            |     | Whether the column will be hidden (globally) on the Item Listing page
**required** _Boolean_               |     | Whether the column is required. If required, the interface's validation function will be triggered
**sort** _Integer_                    |     | The sort order of the column used to override the column order in the schema
**comment** _String_                 |     | A helpful note to users for this column
**relationship_type** _String_       |     | The column's relationship type (only used when storing relational data) eg: `ONETOMANY`, `MANYTOMANY` or `MANYTOONE`
**related_table** _String_           |     | The table name this column is related to (only used when storing relational data)
**junction_table** _String_          |     | The pivot/junction table that joins the column's table with the related table (only used when storing relational data)
**junction_key_left** _String_       |     | The column name in junction that is related to the column's table (only used when storing relational data)
**junction_key_right** _String_      |     | The column name in junction that is related to the related table (only used when storing relational data)

### Example Request

```bash
$ curl -X POST -d "column_name=year&data_type=int&char_length=4&ui=numeric&comment=Year+build" \       
        https://instance--key.directus.io/api/1.1/tables/projects/columns \
        -u [user-token]:
```

```php
$column = $client->createColumn([
    'name' => 'year',
    'table' => 'projects',
    'type' => 'int',
    'ui' => 'numeric',
    'comment' => 'Lorem Ipsum'
    'length' => 4
]);
```

```javascript
client.createColumn({
  name: 'year',
  table: 'projects',
  type: 'int',
  ui: 'numeric',
  comment: 'Lorem Ipsum',
  length: 4
});
```

## Response

<span class="attributes">Attribute</span> | Description
---------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
**data** _Column Object_ | <span class="custom">This data and its architecture is based on Directus columns's schema</span> [**Column Object**: View Nested Attributes](/overview/objects-model.md#column-object)

### Example Response

```json
{
  "meta": {
    "table": "directus_columns",
    "type": "item"
  },
  "data": {
    "id": "title",
    "column_name": "title",
    "type": "VARCHAR",
    "char_length": "100",
    "is_nullable": "YES",
    "comment": "Lorem Ipsum",
    "sort": 3,
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
