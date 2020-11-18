# Filters

Filters are a way to refine listing results based on one or more conditions.

### How to use

To add a filter you have to use the query param key `filters` with the following format: `filters[column-name][operator]=value`


#### Example: Fetching `customers` from United States

`api/1.1/tables/customers/rows?filters[country][eq]=us`

`api/1.1/tables/customers/rows` is the endpoint where all the rows are returned, limited by the default limit, which is 200.

`filters[country][eq]=us` filters the customers to only those with `country` equal to `us`.

Also `filters[country][eq]=us` can be simplified to `filters[country]=us`

To add another filter you have to separate each filters with the ampersand symbol (`&`).

#### Example: Fetching `customers` from New York, United States

`api/1.1/tables/customers/rows?filters[country][eq]=us&filters[state][eq]=ny`

#### Example: Fetching `customers` from New York and New Mexico, United States

`api/1.1/tables/customers/rows?filters[country][eq]=us&filters[state][in]=ny,nm`

By default all condition are grouped in AND logical operators, the example below will explain how to use or operator:

#### Example: Fetching `customers` from New York and New Mexico OR Oregon and Louisiana, United States

`api/1.1/tables/customers/rows?filters[country][eq]=us&filters[state][in]=ny,nm&filters[state][logical]=or&filters[state][in]=or,la`

**Note**: Directus does not support relational filtering or multiple filters for the same column (yet).

#### Supported Operators

Operator                | Description
----------------------- | ----------------------
`=`, `eq`               | Equal to
`<>`, `!=`, `neq`       | Not Equal to
`<`, `lt`               | Less than
`<=`, `lte`             | Less than or equal to
`>`, `gt`               | Greater than
`>=`, `gte`             | Greater than or equal to
`in`                    | Match one of the value in the list
`nin`                   | Not match any value in the list
`null`                  | Is Null
`nnull`                 | Is Not Null
`contains`              | Contains a string
`ncontains`             | Not Contains a string
`between`               | Is Between
`nbetween`              | Is Not Between
`empty`                 | Is Emtpy
`nempty`                | Is Not Empty
`has`                   | Has one or more related entries
`nhas`                  | Has zero related entries
