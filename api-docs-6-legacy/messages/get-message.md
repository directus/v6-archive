# Get Message

<span class="request">`GET` **/api/1.1/messages/rows/_[message-id]_**</span>

<span class="description">Get a specific message by its ID (if it belongs to the given or authenticated user)</span>

<span class="arguments">Name</span> | Value | Description
--------|-----|------------
**message-id** _Integer_ | <span class="required">Required</span> | The `id` of the message you wish to get

### Example Request

```bash
$ curl https://instance--key.directus.io/api/1.1/messages/1 \
  -u [user-token]:
```

```php
$messageId = 1;
$userId = 2; // On db connection only
$messages = $client->getMessage($messageId, $userId);
```

```javascript
const messageId = 1;
client.getMessage(messageId);
```

## Response

<span class="attributes">Attribute</span> | Description
--------|------------
**meta** _Meta Object_ | The Directus system metadata object that provides useful information not contained within the dataset itself [**Meta Object**: View Nested Attributes](/overview/objects-model.md#meta-object)
**data** _Message Object_ | <span class="custom">This data and its architecture is based on Directus messages's schema</span> [**Message Object**: View Nested Attributes](/overview/objects-model.md#message-object)

### Example Response

```json
{
  "meta": {
    "read": 1,
    "unread": 0,
    "total": 1,
    "max_id": 20,
    "type": "collection",
    "table": "directus_messages"
  },
  "data": {
    "id": 1,
    "from": 1,
    "subject": "Sunday Morning meeting",
    "message": "Cancelled!",
    "attachment": null,
    "datetime": "2016-11-02T13:04:47-04:00",
    "response_to": null,
    "read": 1,
    "responses": {
      "rows": []
    },
    "recipients": "2,1",
    "date_updated": "2016-11-02T13:04:47-04:00"
  }
}
```
