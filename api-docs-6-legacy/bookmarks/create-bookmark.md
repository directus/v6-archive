# Create Bookmark

<span class="request">`POST` **/api/1.1/bookmarks**</span>

<span class="description">Create a new bookmark</span>

<span class="arguments">Name</span> | Value | Description
--------------|--------------- | ----------------------
**user** _Integer_         |   | [Directus user id] This assigns the bookmark to a specific user (there's a ticket to allow for "global" bookmarks using `NULL`) (Only using local connection)
**title** _String_         |   | The text to display in the navigation menu
**url** _String_           |   | The path to navigate to when clicked, relative to the Directus root
**icon_class** _String_     |  | Deprecated
**active** _String_        |   | Deprecated
**section** _String_        |  | ["search" or "other"] Which nav section to show the link within. User generated bookmarks use "search", while all system links go within "other"

> **Note:** Creating a bookmark will create only a link which will point to an url given.

> **Note:** Creating a bookmark saving a result filtered with different parameters you have to create a preferences with the same title as the bookmark, having the url formatted as follow `/tables/[table-name]/pref/[bookmark-title]`

### Example Request

```bash
$ curl --data "title=Draft+Articles&table_name=articles&status=2" \
        https://instance--key.directus.io/api/1.1/bookmarks \
                -u [user-token]:
```

```php
$bookmark = $client->createBookmark([
  'title' => 'Draft Articles',
  'table_name' => 'articles',
  'status' => '2'
]);
```

```javascript
client.createBookmark({
  title: 'Draft Articles',
  table_name: 'articles',
  status: 2
});
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
**data** _Bookmark Object_ | <span class="custom">This data and its architecture is based on Directus bookmarks's schema</span> [**Bookmark Object**: View Nested Attributes](/overview/objects-model.md#bookmark-object)

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
