# Delete Bookmark

<span class="request">`DELETE` **/api/1.1/bookmarks/_[bookmark-id]_**</span>

<span class="description">Deletes a bookmark</span>

### Example Request

```bash
$ curl -X DELETE https://instance--key.directus.io/api/1.1/bookmarks/1 \
  -u [user-token]:
```

```php
$bookmark = $client->deleteBookmark(1);
```

```javascript
client.deleteBookmark(1);
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
**success** _Boolean_ | Whether or not the bookmark was deleted
**error** _Error Object_ | This object contains error information (if any) <a class="object">**Error Object**: View Nested Attributes</a>

### Example Request (Success)

```json
{
  "success": true
}
```

### Example Request (Failure)

```json
{
  "success": false,
  "error": {
    "message": "bookmark_not_found"
  }
}
```
