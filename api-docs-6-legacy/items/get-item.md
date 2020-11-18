# Get Item

> **Note:** Table names are case-sensitive

<span class="request">`GET` **/api/1.1/tables/_[table-name]_/rows/_[row-id]_**</span>

<span class="description">Get a specific item within a table</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**table-name** _String_ | <span class="required">Required</span> | The table that contains the item you wish to get
**row-id** _Integer_ | <span class="required">Required</span> | The `id` of the item you wish to get
**depth** _Integer_ | <span class="default">Optional</span> | Set the depth of relational items being fetched and returned
**preview** _Integer_ | <span class="default">Default **0**</span> | Ignore the status column. Returns everything

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/tables/projects/rows/1 \
        -u [user-token]:
```

```php
$item = $client->getItem('projects', 1);
```

```javascript
client.getItem('projects', 1);
```

## Response

<span class="attributes">Attribute</span> | Description
-------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
<span class="custom">**data**</span> _object_ | <span class="custom">This data and its architecture is based on your specific project's schema</span>

### Example Response

```json
{
  "meta": {
    "type": "item",
    "table": "projects"
  },
  "data": {
    "id": 1,
    "title": "Lorem Ipsum"
  }
}
```
