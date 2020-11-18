# Get Privileges

> **Note:**: Only admin has permission to access this endpoint

<span class="request">`GET` **/api/1.1/privileges/_[group-id]_**</span>

<span class="description">Get the privileges for the specified user group</span>

<span class="arguments">Name</span> | Value | Description
------------------ | ----- | -----------
**group-id** _Integer_  |  <span class="required">Required</span>  |  The group `id` you wish to get the privileges from

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/privileges/1 \
  -u [user-token]:
```

```php
$privileges = $client->getGroupPrivileges(1);
```

```javascript
client.getGroupPrivileges(1);
```

## Response

List of all the tables with their privileges for the specified user-group.

<span class="attributes">Attribute</span> | Description
-------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
<span class="custom">**data**</span> _Privilege Object Collection_ | <span class="custom">This data and its architecture is based on Directus Privileges's schema</span> [**Privilege Object**: View Nested Attributes](/overview/objects-model.md#privilege-object)

### Example Request

```json
{
  "meta": {
    "type": "item",
    "table": "directus_privileges"
  },
  "data": [{
    "id": 1,
    "table_name": "projects",
    "group_id": 1,
    "read_field_blacklist": null,
    "write_field_blacklist": null,
    "nav_listed": 1,
    "status_id": 0,
    "allow_view": 2,
    "allow_add": 1,
    "allow_edit": 2,
    "allow_delete": 2,
    "allow_alter": 1
  }]
}
```
