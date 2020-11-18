# Get Settings

<span class="request">`GET` **/api/1.1/settings**</span>

<span class="description">Get all Directus settings</span>

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/settings \
  -u [user-token]:
```

```php
$settings = $client->getSettings();
```

```javascript
client.getSettings();
```

## Response

<span class="attributes">Attribute</span> | Description
---------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
<span class="custom">**data**</span> _object_ | <span class="custom">This data and its architecture is based on Directus settings's content</span>

### Example Response

```json
{
  "meta": {
    "type": "item",
    "table": "directus_settings"
  },
  "data": {
    "global": {
      "cms_user_auto_sign_out": "60",
      "project_name": "Directus Demo",
      "project_url": "http:\/\/examplesite.dev\/",
      "cms_color": "#7ac943",
      "rows_per_page": "200",
      "cms_thumbnail_url": ""
    },
    "files": {
      "allowed_thumbnails": "",
      "thumbnail_quality": "100",
      "thumbnail_size": "200",
      "file_naming": "file_id",
      "thumbnail_crop_enabled": "1",
      "youtube_api_key": ""
    }
  }
}
```
