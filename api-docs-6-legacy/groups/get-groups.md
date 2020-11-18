# Get Groups

<span class="request">`GET` **/api/1.1/groups**</span>

<span class="description">Get system information for all user groups</span>

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/groups \
        -u [user-token]:
```

```php
$groups = $client->getGroups();
```

```javascript
client.getGroups();
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
**data** _Group Object Collection_ | <span class="custom">This data and its architecture is based on Directus groups's schema</span> [**Group Object**: View Nested Attributes](/overview/objects-model.md#group-object)

### Example Response

```json
{
  "meta": {
    "table": "directus_groups",
    "type": "collection",
    "total": 1,
  },
  "data": [{
    "id": 1,
    "name": "Administrator",
    "description": null,
    "restrict_to_ip_whitelist": 0,
    "nav_override": null,
    "show_activity": 1,
    "show_messages": 1,
    "show_users": 1,
    "show_files": 1,
    "nav_blacklist": null
  }]
}
```
