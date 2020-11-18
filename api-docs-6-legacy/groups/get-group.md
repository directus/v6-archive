# Get Group

<span class="request">`GET` **/api/1.1/groups/_[id]_**</span>

<span class="description">Get system information for the specified user group</span>

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/groups/1 \
  -u [user-token]:
```

```php
$group = $client->getGroup(1);
```

```javascript
client.getGroup(1);
```

## Response

<span class="attributes">Attribute</span> | Description
-------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
**data** _Group Object_ | <span class="custom">This data and its architecture is based on Directus groups's schema</span> [**Group Object**: View Nested Attributes](/overview/objects-model.md#group-object)

### Example Response

```json
{
  "meta": {
    "table": "directus_groups",
    "type": "item"
  },
  "data": {
    "id": "1",
    "name": "Administrator",
    "description": null,
    "restrict_to_ip_whitelist": "0",
    "nav_override": null,
    "show_activity": "1",
    "show_messages": "1",
    "show_users": "1",
    "show_files": "1",
    "nav_blacklist": null
  }
}
```
