# Create Item

> **Note:** Table names are case-sensitive

> **Note:** These arguments and attributes are based on the table's custom columns

<span class="request">`POST` **/api/1.1/tables/_[table-name]_/rows**</span>

<span class="description">Create a new item within the specified table</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**table** _String_ | <span class="required">Required</span> | The table within which the item will be added
<span class="custom">**data**</span> _Array_ | | <span class="custom">This data and its architecture is based on your specific project's schema</span>

### Example Request

```bash
$ curl --data "active=1&title=Lorem+Ipsum" \
        https://instance--key.directus.io/api/1.1/tables/projects/rows \
                -u [user-token]:
```

```php
$newProject = $client->createItem('projects', [
    'active' => 1,
    'title' =>  'Lorem Ipsum'
]);
```

```javascript
client.createItem('projects', {
  active: 1,
  title: 'Lorem Ipsum'
});
```

## Response

<span class="attributes">Attribute</span> | Description
-------|------------
**meta** _object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
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
