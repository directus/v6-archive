# Update Preference

> **Note:** Table names are case-sensitive

<span class="request">`PUT` **/api/1.1/tables/_[table-name]_/preferences**</span>

<span class="description">Update a preference within a specific table</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**table-name** _String_  |  <span class="required">Required</span>  |  The table you wish to update the preferences
**id** _Integer_           |   | Preference's Unique Identification number
**table_name** _String_     |  | Name of the table
**columns_visible** _String_   |  | List of visible columns, separated by commas
**sort** _String_          |   | Result will be sorted by this column
**sort_order** _String_     |  | Sort Order (ASC=Ascending or DESC=Descending)
**status** _String_         |  | List of status values. separated by comma

### Example Request

```bash
$ curl -d sort_order=DESC https://instance--key.directus.io/api/1.1/tables/projects/preferences \
        -u [user-token]:
```

```javascript
client.updatePreferences('projects', {
  sort_order: 'DESC'
});
```

## Response

<span class="attributes">Attribute</span> | Description
--------|-----|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
<span class="custom">**data**</span> _Preference Object_ | <span class="custom">This data and its architecture is based on Directus Preferences's schema</span> [**Preference Object**: View Nested Attributes](/overview/objects-model.md#preference-object)

### Example Response

```json
{
  "meta": {
    "table": "directus_preferences",
    "type": "item"
  },
  "data": {
    "id": 1,
    "table_name": "projects",
    "title": null,
    "columns_visible": "title",
    "sort": "id",
    "sort_order": "DESC",
    "status": "1,2",
    "search_string": null
  }
}
```
