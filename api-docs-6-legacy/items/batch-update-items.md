# Batch Update Items

> **Note:** Table names are case-sensitive

<span class="request">`PUT` **/api/1.1/tables/_[table-name]_/rows/bulk**</span>

<span class="description">Update multiple items within a specific table</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**table-name** _String_ | <span class="required">Required</span> | The table that contains the items you wish to update
<span class="custom">**Custom Data**</span> _Array_ | <span class="required">Required</span> | <span class="custom">This data and its architecture is based on your specific project's schema</span>

### Example Request

```javascript
const items = [
  {
    id: 1,
    active: 1,
    title: 'Lorem Ipsum'
  },
  {
    id: 2,
    active: 1,
    title: 'Another Lorem Ipsum'
  }
];

client.updateBulk('projects', items);
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
