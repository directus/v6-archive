# Get Preferences

> **Note:** Table names are case-sensitive

<span class="request">`GET` **/api/1.1/tables/_[table-name]_/preferences**</span>

<span class="description">Get all preferences for a table</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**table-name** _String_  |  <span class="required">Required</span>  |  The table you wish to get the preferences from

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/tables/projects/preferences \
        -u [user-token]:
```

```php
$preferences = $client->getPreferences('projects');
```

```javascript
client.getPreferences('projects');
```

## Response

<span class="attributes">Attribute</span> | Description
-------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
<span class="custom">**data**</span> _Preference Object_ | <span class="custom">This data and its architecture is based on Directus Preferences's schema</span> [**Preference Object**: View Nested Attributes](/overview/objects-model.md#preference-object)

### Example Response

```json
{
  "meta": {
    "type": "item",
    "table": "directus_preferences"
  },
  "data": {
    "id": 1,
    "user": 1,
    "table_name": "projects",
    "title": null,
    "columns_visible": "title",
    "sort": "id",
    "sort_order": "ASC",
    "status": "1,2",
    "search_string": null
  }
}
```
