# Delete Column

> **Note:** Table names are case-sensitive

<span class="request">`DELETE` **/api/1.1/tables/_[table-name]_/columns/_[column-name]_**</span>

<span class="description">Deletes a column from the specified table</span>

<span class="arguments">Name</span> | Value | Description
------------------ | ----- | -----------
**table-name** _String_             | <span class="required">Required</span>    | The name of the table that contains the column to delete
**column-name** _String_            | <span class="required">Required</span>    | The name of the column you wish to delete

### Example Request

```bash
$ curl -X DELETE  https://instance--key.directus.io/api/1.1/tables/projects/columns/intro \
        -u [user-token]:
```

```php
$client->deleteColumn('projects', 'intro');
```

```javascript
client.deleteColumn('projects', 'intro');
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
**success** _Boolean_ | Whether or not the bookmark was deleted
**error** _Error Object_ | Contains error information for failures <a class="object">**Error Object**: View Nested Attributes</a>

### Example Response (Success)

```json
{
  "meta": {
    "table": "projects",
    "column": "intro"
  },
  "success": true
}
```

### Example Response (Failure)

```
{
  "meta": {
    "table": "projects",
    "column": "intro"
  },
  "success": false,
  "error": {
    "message": "column `intro` does not exists in table: `projects`"
  }
}
```
