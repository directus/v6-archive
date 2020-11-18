# Update Item

> **Note:** Table names are case-sensitive

<span class="request">`PUT` **/api/1.1/tables/_[table-name]_/rows/_[row-id]_**</span>

<span class="description">Update an item within a specific table</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**table-name** _String_ | <span class="required">Required</span> | The table that contains the item you wish to update
**row-id** _Integer_ | <span class="required">Required</span> | The `id` of the item you wish to update
<span class="custom">**Custom Data**</span> _Array_ | <span class="required">Required</span> | <span class="custom">This data and its architecture is based on your specific project's schema</span>

### Example Request

```bash
$ curl --data "title=Lorem Ipsum" \
        https://instance--key.directus.io/api/1.1/tables/projects/rows/1 \
                -u [user-token]:
```

```php
$updatedProject = $client->updateItem('projects', 1, [
  'title' => 'Lorem Ipsum'
]);
```

```javascript
client.updateItem('projects', 1, {
  title: 'Lorem Ipsum'
});
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
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
    "active": 1,
    "title": "Lorem Ipsum"
  }
}
```
