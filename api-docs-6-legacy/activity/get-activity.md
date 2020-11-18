# Get Activities

<span class="request">`GET` **/api/1.1/activity**</span>

<span class="description">Get all the activity records within Directus</span>

<span class="arguments">Name</span> | Value | Description
--------------|--------------- | ----------------------
**limit** _Integer_  |  <span class="default">Default **200**</span>  |  The number of items to request
**offset**  _Integer_ |  <span class="default">Default **0**</span>  |  The offset for for the items
**in[field]**  _String_ | <span class="default">Optional</span> | Only list records that its `field` matches one of given value. Can be separated by commas `in[id]=1,2`
**ids** _String_  |  <span class="default">Optional</span>  |  Only list records that its `field` matches one of given value. Can be separated by commas `ids=1,2`. Same as `in[id]=1,2`
**filters** | <span class="default">Optional</span> | Use `Filter Object` to filter the result.

### Example Request

```bash
$ curl -g https://instance--key.directus.io/api/1.1/activity&filters[table_name]=projects \
  -u [user-token]:
```

```php
$activity = $client->getActivity([
  'filters' => [
    'table_name' => projects
  ]
]);
```

```javascript
client.getActivity({
  filters: {
    table_name: 'projects'
  }
})
```

## Response

<span class="attributes">Attribute</span> | Description
--------|-----|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
**data** _Activity Object Collection_ | <span class="custom">This data and its architecture is based on Directus activity's schema</span> [**Activity Object**: View Nested Attributes](/overview/objects-model.md#activity-object)

### Example Response

```json
{
  "meta": {
    "table": "directus_activity",
    "type": "collection",
    "total": 2,
  },
  "data": [{
      "id": 1,
      "identifier": "School Website",
      "action": "ADD",
      "table_name": "projects",
      "row_id": 5,
      "user": 1,
      "datetime": "2016-12-06T09:46:40-05:00",
      "type": "ENTRY",
      "data": "<json-data-used>"
    },{
      "id": 2,
      "identifier": "Benjamin School for gifted children Website",
      "action": "UPDATE",
      "table_name": "projects",
      "row_id": 5,
      "user": 1,
      "datetime": "2016-12-07T08:58:00-05:00",
      "type": "ENTRY",
      "data": "<json-data-used>"
    }]
}
```
