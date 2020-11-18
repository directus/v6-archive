# Create Group

<span class="request">`POST` **/api/1.1/groups**</span>

<span class="description">Create a new user group</span>

<span class="arguments">Name</span> | Value | Description
------------------ | ---------------------------------------- | -------------------
**name** _String_  |  <span class="required">Required</span>  |  The name of the new group

### Example Request

```bash
$ curl --data "name=Manager" https://instance--key.directus.io/api/1.1/groups \
  -u [user-token]:
```

```php
$newGroup = $client->createGroup('Manager');
```

```javascript
client.createGroup('Manager');
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
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
    "id": 2,
    "name": "Manager",
    "description": null,
    "restrict_to_ip_whitelist": 0,
    "nav_override": null,
    "show_activity": 1,
    "show_messages": 1,
    "show_users": 1,
    "show_files": 1,
    "nav_blacklist": null
  }
}
```
