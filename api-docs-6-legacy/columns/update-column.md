# Update Column

> **Note:** Table and column names are case-sensitive

> **Note:** Does not update the table column-type.

<span class="request">`PUT` **/api/1.1/tables/_[table-name]_/columns/_[column-name]_**</span>

<span class="description">Updates a column within the specified table</span>

<span class="arguments">Name</span> | Value | Description
------------------ | ----- | -----------
**column_name** _String_                    |     | Column name
**table_name** _String_                   |     | Table name
**data_type** _String_                    |     | Data type
**ui** _String_                      |     | UI name
**hidden_input** _Boolean_           |     | Whether the column will be hidden in the edit form
**hidden_list** _Boolean_            |     | Whether the column will be hidden in the list page
**required** _Boolean_               |     | Whether the column is required
**sort** _String_                    |     | Sort position in number
**comment** _String_                 |     | Note on the column
**relationship_type** _String_       |     | Column relationship type, `ONETOMANY`, `MANYTOMANY` or `MANYTOONE`
**related_table** _String_           |     | The table name this column is related to
**junction_table** _String_          |     | The pivot/junction table that joins the column's table with the related table
**junction_key_left** _String_       |     | The column name in junction that is related to the column's table
**junction_key_right** _String_      |     | The column name in junction that is related to the related table

### Example Request

```bash
$ curl -X PUT --data "comment=Project+Name" https://instance--key.directus.io/api/1.1/tables/projects/title \
        -u [user-token]:
```

```javascript
client.updateColumn('projects', 'title', {
  comment: 'Project Name'
});
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
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
    "comment": "Project Name",
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
