# Batch Create Items

> **Note:** Table names are case-sensitive

> **Note:** These arguments and attributes are based on the table's custom columns

<span class="request">`POST` **/api/1.1/tables/_[table-name]_/rows/bulk**</span>

<span class="description">Create multiple new items within the specified table</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**table** _String_ | <span class="required">Required</span> | The table within which the item will be added
<span class="custom">**data**</span> _Object_ | | <span class="custom">This data and its architecture is based on your specific project's schema</span>

### Example Request

```bash
# Using json as data
$ curl -H "Content-Type: application/json" \
        --data '{"rows": [{"active": 1, "title": "Lorem Ipsum"}, {"active":1,"title": "Another Lorem Ipsum"}]}' \
        https://instance--key.directus.io/api/1.1/tables/projects/rows/bulk \
                -u [user-token]:

# Using application/x-www-form-urlencoded
$ curl --data "rows[0][active]=1&rows[0][title]=Lorem+Ipsum&rows[1][active]=1&rows[1][title]=Another+Lorem+Ipsum" \
        https://instance--key.directus.io/api/1.1/tables/projects/rows/bulk \
                -u [user-token]:
```

```javascript
const items = [
  {
    active: 1,
    title: 'Lorem Ipsum'
  },
  {
    active: 1,
    title: 'Another Lorem Ipsum'
  }
];

client.createBulk('projects', items);
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
    "table": "projects",
    "type": "collection",
    "total": 2,
    "total_entries": 2
  },
  "data": [
    {
      "id": 1,
      "active": 1,
      "title": "Lorem Ipsum"
    },
    {
      "id": 2,
      "active": 1,
      "title": "Another Lorem Ipsum"
    }
  ]
}
```
