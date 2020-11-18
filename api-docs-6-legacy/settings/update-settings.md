# Update Settings

> **Note:** If the setting doesn't not exist it will create a new one

<span class="request">`PUT` **/api/1.1/settings/_[collection-name]_**</span>

<span class="description">Update the Directus settings for the specified collection</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**collection-name** _Integer_ | <span class="required">Required</span> | The setting `collection` name you wish to edit
**data** _Array_ | <span class="required">Required</span> | Pair of key-value setting to be updated, eg: `rows_per_page=50`

### Example Request

```bash
$ curl --data "rows_per_page=100" https://instance--key.directus.io/api/1.1/settings/global \
  -u [user-token]:
```

```php
$setting = $client->updateSettings('global', [
  'rows_per_page' => 100
])
```

```javascript
client.updateSettings('global', {
  rows_per_page: 100
});
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
<span class="custom">**data**</span> _object_ | <span class="custom">This data and its architecture is based on Directus settings's content</span>

### Example Response

```json
{
  "meta": {
    "type": "item",
    "table": "directus_settings",
    "setting_collection": "global"
  },
  "data": {
    "cms_user_auto_sign_out": "60",
    "project_name": "Directus Demo",
    "project_url": "http:\/\/examplesite.dev\/",
    "cms_color": "#7ac943",
    "rows_per_page": "100",
    "cms_thumbnail_url": ""
  }
}
```
