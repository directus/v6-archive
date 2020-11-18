# Relationships

## Many-to-One (M2O)
Many-to-One relationships save the `id` from another item as it's value, creating a dynamic relationship to that item. The related item can be from any other table – including the *same* table (eg: `projects.related_projects`).

## One-to-Many (O2M)
This relationship is effectively the same as a Many-to-One, only as "seen" from the related table. O2M is a collection of related items that each contain the current item's `id` in their M2O column.

## Many-to-Many (M2M)
Many-to-Many relationships are quite a bit more complex, but very powerful. There are two things that are important to understand for M2Ms: Junction Tables, and Aliases.

*Example: Shirt -> Materials* 

```
shirt (Table)
* id
* name
* size
* "materials" (M2M Alias)

materials (Table)
* id
* material

shirt_materials (Junction Table)
* id
* sort (Optional)
* shirt_id
* material_id
```

#### Junction Tables
We can't efficiently store multiple relational values in a single column (though a CSV of IDs is possible), so M2M fields store all their relationships in a separate table called a "junction table" created just for this purpose. Junction tables are very simple – like all Directus tables they have an `id` column, but they also have two more columns for storing the IDs of the two related items. In the example above we're linking shirts with their respective materials – so we have a `shirt_materials` junction table with `shirt_id` and `material_id` columns.

> **AKA:** *Cross-reference table, Bridge table, Join table, Map table, or Intersection table*

> **Re-Ordering**: You can add a `sort` column (see above example) to allow the relational items to be manually sorted with drag-and-drop.

#### Aliases
Another thing you may have noticed is that the `materials` column says `Alias` and has quotes around it. Since we're not actually storing anything here (remember, values are stored in the Junction Table) we don't need to create an actual column in the database. Instead, Directus uses an Alias column (like a ghost column) to *represent* a column for M2M UIs. Aliases columns don't exist in your database schema, they are added in the `directus_columns` table.