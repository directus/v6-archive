# Update Privileges

> **Note:**: Only admin has permission to access this endpoint

<span class="request">`PUT` **/api/1.1/privileges/_[group-id]_/_[privileges-id]_**</span>

<span class="description">Update the specified group privileges for the specified table</span>

<span class="arguments">Name</span> | Value | Description
------------------ | ----- | -----------
**group-id** _Integer_  |  <span class="required">Required</span>  |  The group `id` you wish to update the privileges
**privileges-id** _Integer_  |  <span class="required">Required</span>  |  The privilege `id` you wish to update
**id** _Integer_            |  | Privilege's Unique Identification number
**group_id** _Integer_              |  | Group ID
**table_name** _String_            |   | Table name that this permissions belongs to
**allow_add** _Integer_            |   | Whether the group is allow to add/create entries in the table (See values below)
**allow_edit** _Integer_           |   | Whether the group is allow to edit/update entries in the table (See values below)
**allow_delete** _Integer_        |    | Whether the group is allow to delete/remove entries in the table (See values below)
**allow_view** _Integer_           |   | Whether the group is allow to view/read entries in the table (See values below)
**allow_alter** _Integer_         |    | Whether the group is allow to add/create entries in the table (See values below)
**nav_listed** _Boolean_           |   | Whether the table should be visible in the sidebar
**read_field_blacklist** _String_   |  | List of columns that the group can't view/read
**write_field_blacklist** _String_  |  | List of columns that the group can't edit/update
**status_id** _String_              |  | State of the record that this permissions belongs to (Draft, Active or Soft Deleted)

### Example Request

```bash
$ curl -X PUT --data "allow_view=1" https://instance--key.directus.io/api/1.1/privileges/1/1 \
  -u [user-token]:
```

```php
$privilege = $client->updateItem('directus_privileges', 1, [
  'allow_view' => 1
]);
```

```javascript
client.updatePrivileges(1, 1, {
  allow_view: 1
});
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
<span class="custom">**data**</span> _Privilege Object_ | <span class="custom">This data and its architecture is based on Directus Privileges's schema</span> [**Privilege Object**: View Nested Attributes](/overview/objects-model.md#privilege-object)

### Example Response

```json
{
  "meta": {
    "type": "item",
    "table": "directus_privileges"
  },
  "data": {
    "id": 2,
    "table_name": "projects",
    "group_id": 2,
    "read_field_blacklist": null,
    "write_field_blacklist": "title,published_date",
    "nav_listed": 1,
    "status_id": 0,
    "allow_view": 1,
    "allow_add": 1,
    "allow_edit": 2,
    "allow_delete": 0,
    "allow_alter": 1
  }
}
```
