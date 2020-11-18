# Get Bookmark

<span class="request">`GET` **/api/1.1/bookmarks/_[bookmark-id]_**</span>

<span class="description">Get all of the bookmarks for the current user</span>

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/bookmarks/1 \
  -u [user-token]:
```

```php
$bookmark = $client->getBookmark(1);
```

```javascript
client.getBookmark(1);
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
**data** _Bookmark Object_ | <span class="custom">This data and its architecture is based on Directus bookmarks's schema</span>

### Example Response

```json
{
  "meta": {
    "table": "directus_bookmarks",
    "type": "item",
  },
  "data": {
    "id": 1,
    "user": 1,
    "title": "Draft Articles",
    "url": "tables/articles/pref/Draft Articles",
    "icon_class": null,
    "active": null,
    "section": "search"
  }
}
```
