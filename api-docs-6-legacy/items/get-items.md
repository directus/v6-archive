# Get Items

> **Note:** Table names are case-sensitive

> **Note:** These arguments and attributes are based on the table's custom columns

<span class="request">`GET` **/api/1.1/tables/_[table-name]_/rows**</span>

<span class="description">Retrieve a collection of items within a specific table based on the current user's privileges</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**table-name** _String_  |  <span class="required">Required</span>  |  The table you wish to get the items from
**limit** _Integer_  |  <span class="default">Default **200**</span>  |  The number of items to request
**offset**  _Integer_ |  <span class="default">Default **0**</span>  |  The offset for for the items
**order[field]** _String_  |  <span class="default">Default **ASC**</span> |  Order the result will be sorted to. Available options are: `ASC` (Ascending) or `DESC` (Descending)
**status**  _String_ |  <span class="default">Default **None**</span> | List of status values to be included. Separated by commas: `1,2`
**columns** _String_  |  <span class="default">Optional</span>  |  The columns to be shown on the result. Columns are separated by comma: `columns=id,title,published_date`
**depth** _Integer_ | <span class="default">Optional</span> | Set the depth of relational items to be fetched and returned
**preview** _Integer_ | <span class="default">Default **0**</span> | Ignore the status column. Returns everything
**in[field]**  _String_ | <span class="default">Optional</span> | Only list records where the `field` matches a specific value. Values can be separated by commas: `in[id]=1,2`
**ids**  |  <span class="default">Optional</span>  |  Only list records with the specified `id` values. Can be separated by commas. `ids=1,2`. Same as `in[id]=1,2`
**filters** | <span class="default">Optional</span> | Use [`Filter Operators`](/overview/endpoints.md#supported-filters-operators) to filter the result

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/tables/projects/rows \
        -u [user-token]:
```

```php
$projects = $client->getItems('projects');
```

```javascript
client.getItems('projects');
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
<span class="custom">**data**</span> _object_ | <span class="custom">This data and its architecture is based on your specific project's schema</span>

### Example Response

```json
{
  "meta": {
    "Delete": 0,
    "Active": 1,
    "Draft": 0,
    "total": 1,
    "total_entries": 1,
  },
  "data": [
    {
      "id": 1,
      "title": "Lorem Ipsum"
    },
    {
      ...
    }
  ]
}
```
