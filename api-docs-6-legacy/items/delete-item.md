# Delete Item

> **Note:** Table names are case-sensitive

> **Note:** To perform a soft-delete, add `soft=1` as query parameter to the url. Only works if status interface column exists.

<span class="request">`DELETE` **/api/1.1/tables/_[table-name]_/rows/_[row-id]_**</span>

<span class="description">Delete (or soft-delete) an item within a specific table</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**table-name** _String_ | <span class="required">Required</span> | The table that contains the item you wish to delete
**row-id** _Integer_ | <span class="required">Required</span> | The `id` of the item you wish to delete

### Example Request

```bash
$ curl -X DELETE \
        https://database.account.directus.io/api/1.1/tables/projects/rows/1 \
                -u [user-token]:
```

```php
$response = $client->deleteItem('projects', 1);
```

```javascript
client.deleteItem('projects', 1);
```

## Response

<span class="attributes">Attribute</span> | Description
--------|-----|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
<span class="custom">**success**</span> _Boolean_ | Whether the deletion was successful or not

### Example Response

```json
{
  "meta": {
    "table": "projects"
  },
  "success": true
}
```
