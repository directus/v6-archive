# Batch Delete Items

> **Note:** Table names are case-sensitive

> **Note:** To perform a Soft-delete directly, use the update endpoint and update the `status` column

<span class="request">`DELETE` **/api/1.1/tables/_[table-name]_/rows/bulk**</span>

<span class="description">Delete (or soft-delete) an item within a specific table</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**table-name** _String_ | <span class="required">Required</span> | The table that contains the items you wish to delete

### Example Request

```javascript
const itemsToDelete = [{id: 1}, {id: 2}];

client.deleteBulk('projects', itemsToDelete);
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
    "table": "projects",
    "ids": [
      1,
      2
    ]
  },
  "data": {
    "success": true
  }
}
```
