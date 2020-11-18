# Hooks

Hooks allow project-specific code to interact directly with Directus Core events. The hooks are very simple to implement: just add custom logic to the (untracked) config file at `/directus/api/configuration.php`.

All the logic you need to implement that will perform an action, such as send  an email to users when a post is created, it should be defined under `hooks` in the configuration file.

All the logic you need to implement that will modify the data being used, such as change the post published date time based on timezone, it should be defined under `filters` in the configuration file.

## Creating an Action Hook

This hook will be executed every time a record is inserted in any table.

Add the event name `table.insert` to the configuration (`api/configuration.php`) `hooks` key, _if the key does not exists, add it_.

### Using a function

```php
[
    'hooks' => [
        'table.insert' => function ($table, $data) {
            // execute any code
        }
    ];
];
```

You can also you any class that implement the `__invoke` method instead of a function.

### Using a class implementing __invoke

```php
<?php

namespace \App\Events;

class InsertEvent
{
    public function __invoke($table, $data)
    {
        // execute any code
    }
}
```
```php
[
    'hooks' => [
        'table.insert' => '\App\Events\InsertEvent'
    ];
];
```

### Using a class implementing HookInterface

```php
<?php

namespace \App\Events;

class InsertEvent implements \Directus\Hook\HookInterface
{
    public function handle($table, $data)
    {
        // execute any code
    }
}
```

```php
[
    'hooks' => [
        'table.insert' => '\App\Events\InsertEvent'
    ];
];
```

## Creating an Filter Hook

If you need to add a custom data before being inserted into a table, you need filters hook.

Add the filter name `table.insert.[table-name]:before` to the configuration (`api/configuration.php`) `filters` key, _if the `filters` key does not exists, please add it_.

The filter can be add it the same way as the action hook, anonymous function, classes implementing `__invoke` or implementing `HookInterface` interface.

```php
[
    'filters' => [
        'table.insert.users:before' => function (\Directus\Hook\Payload $payload) {
            $payload->set('secret_key', rand());
            
            return $payload;
        }
    ];
];
```

The filters passes a `Payload` object as paramter, which contain the data and attribute information related to the filter hook, such as the table name the record belong to.

## Payload Object

All filters hook now passes a `Payload` object as parameter instead of an array to represent the data being filtered, using the `Payload` object make easier to pass the data over multiple filters. Each filter function must return the `Payload` so other filters can interact with the updated data.

### Useful methods

Name                    | Description
----------------------- | ------------
`getData()`             | Get the payload data
`attribute($key)`       | Get an attribute key. Ex `$payload->attribute('tableName')`
`get($key)`             | Get an element by its key
`set($key, $value)`     | Set or update new value into the given key
`has($key)`             | Check whether or not the payload data has the given key set
`remove($key)`          | Remove an element with the given key
`isEmpty()`             | Check whether the payload data is empty
`replace($newDataArray)`| Replace the payload data with a new data array
`clear()`               | Remove all data from the payload

**NOTE:** `get()` and `has()` method can use dot-notation to access child elements. ex `get('data.email')`.

`Payload` object is `Arrayable` which means you can interact with the data as an array `$payload['data']['email]`, but you can't do `\Directus\Util\ArrayUtils::get($payload, 'data.email')`.

**IMPORTANT:** All these filters are triggered to Directus core tables as well, so make sure if you don't want to interact with directus tables omit them by checking for them first, as right now all tables are prefixed with `directus_` in front of them.

```php
$table = $payload->attribute('tableName');
if (\Directus\Util\StringUtils::startsWith($table, 'directus_')) {
    return $payload;
}
```

## Action/Event Hooks list

Name                    | Description
----------------------- | ------------
`application.boot`        | When the API start booting. Before all endpoints are being set. app object is passed.
`application.init`        | API has booted but the endpoint hasn't been dispatched. app object is passed.
`application.shutdown`    | API has ran and it's about to shutdown. app object is passed.
`application.error`       | An Error has occurred. Exception object is passed.
`directus.authenticated`  | User has been authenticated. app object and user info (array) is passed.
`directus.authenticated.token`  | User has been authenticated through the **API**. app object and user info (array) is passed.
`directus.authenticated.admin`  | User has been authenticated through the **Web App**. app object and user info (array) is passed.
`directus.start`          | User has been authenticated and API is about to start. app object is passed.
`table.create:before`     | Before a table is being created. Table name passed.
`table.create:after`      | After a table has been created. Table name passed.
`table.create`            | Alias for table.create:after
`table.drop:before`       | Before a table is being dropped. Table name is passed.
`table.drop:after`        | After a table has been dropped. Table name is passed.
`table.drop`              | Alias for table.drop:after
`table.insert:before`     | Before new record is being added to a table. Table name and record data passed.
`table.insert:after`      | After new record has been added to a table. Table name and record data inserted passed.
`table.insert`            | Alias for table.insert:after
`table.insert.[table-name]:before`     | Before new record is being added to [table-name]. Record data passed.
`table.insert.[table-name]:after`      | After new record has been added to [table-name]. Record data inserted passed.
`table.insert.[table-name]`            | Alias for table.insert.[table-name]:after
`table.update:before`     | Before a table record is being updated. Table name and record data passed.
`table.update:after`      | After a table record has been updated. Table name and record data passed.
`table.update`            | Alias for table.update:after
`table.update.[table-name]:before`     | Before a [table-name] record is being updated. Record data passed.
`table.update.[table-name]:after`      | After a [table-name] record has been updated. Record data passed.
`table.update.[table-name]`            | Alias for table.update.[table-name]:after
`table.delete:before`     | Before a table record is being deleted. Table name passed.
`table.delete:after`      | After a table record has been deleted. Table name.
`table.delete`            | Alias for table.delete:after
`table.delete.[table-name]:before`     | Before a [table-name] record is being deleted.
`table.delete.[table-name]:after`      | After a [table-name] record has been deleted.
`table.delete.[table-name]`            | Alias for table.delete.[table-name]:after
`files.saving`            | Before a file is being save. Filename and size is passed.
`files.saving:after`      | After a file has been saved. Filename and size is passed.
`files.thumbnail.saving`            | Before a file thumbnail is being saved. Filename and size is passed.
`files.thumbnail.saving:after`      | After a file thumbnail has been saved. Filename and size is passed.
`files.deleting`            | Before a file is being deleted. File info is passed.
`files.deleting:after`      | After a file has been deleted. File info is passed.
`files.thumbnail.deleting`            | Before a file thumbnail is being deleted. File info is passed.
`files.thumbnail.deleting:after`      | After a file thumbnail has been deleted. File info is passed.
`directus.index.start`    | Index page starts.
`directus.login.start`    | Login page starts.

## Filter Hooks list

Name                    | Description
----------------------- | ------------
`response`              | Before adding the content into the HTTP Response body
`response.[method]`     | Same as `response` but it only executes on a specific method, such as `GET, POST, DELETE, PATCH, PUT, OPTIONS`
`response.[table-name]`              | Same as `response` but it only executes on a specific table
`response.[table-name].[method]`              | Same as `response.[method]` but it only executes on a specific table
`table.insert:before`   | Before inserting a record into any table
`table.insert.[table-name]:before`   | Before inserting a record into `[table-name]` table
`table.select`          | After a table query was executed in any table
`table.[table-name].select` | After a table query was executed in the specific table
