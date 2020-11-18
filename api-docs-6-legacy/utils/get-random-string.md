# Get Random Alphanumeric String

> **Note:** This does not use any sophisticated random algorithm.

<span class="request">`POST` **/api/1.1/random**</span>

<span class="description">Get a random string</span>

<span class="arguments">Name</span> | Value | Description
------------------ | ----- | -----------
**length** _String_  |  <span class="default">Default **32**</span>  |  The length of the random string

### Example Request

```bash
$ curl --data "length=64" \
        https://instance--key.directus.io/api/1.1/random \
        -u [user-token]:
```

```php
$random = $client->getRandom(['length' => 64]);
```

```javascript
var random = client.getRandom({length: 64});
```

## Response

<span class="attributes">Attribute</span> | Description
------|------------
<span class="custom">**data**</span> | Containing a `random` key with the new generated random value.

### Example Response

```json
{
  "success": true,
  "data": {
    "random": "123456789abc"
  }
}
```
