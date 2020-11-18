# Get Bookmarks

<span class="request">`GET` **/api/1.1/bookmarks**</span>

<span class="description">Get all the bookmarks</span>

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/bookmarks \
  -u [user-token]:
```

```php
$bookmarks = $client->getBookmarks();
```

```javascript
client.getBookmarks();
```

## Response

<span class="attributes">Attribute</span> | Description
---------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
**data** _Bookmark Object Collection_ | <span class="custom">This data and its architecture is based on Directus bookmarks's schema</span> [**Bookmark Object**: View Nested Attributes](/overview/objects-model.md#bookmark-object)

### Example Response

```json
{
  "meta": {
    "table": "directus_bookmarks",
    "type": "collection",
    "total": 2,
  },
  "data": [{
      "id": 1,
      "user": 1,
      "title": "Draft Articles",
      "url": "tables/articles/pref/Draft Articles",
      "icon_class": null,
      "active": null,
      "section": "search"
    },
    {
      "id": 2,
      "user": 1,
      "title": "Published News",
      "url": "tables/news/pref/Published News",
      "icon_class": null,
      "active": null,
      "section": "search"
    }]
}
```
