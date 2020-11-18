# Item Listing

This page lists all items within the selected table. It provides several views for filtering, sorting, reordering, bulk-editing, deleting, and updating item status. All page parameters are *persistent* and *per user* – so users should feel free to customize each table to their liking. Click on an item to view/edit it – or the "+" button in the header to create a new item.

## Filtering
The “Filter” input allows you to quickly search for things. For more advanced column filters click the triangle on the right of the input to expand a dropdown. Each column filter you add is considered an “AND” (not "OR") – so if two filters are added, items are shown that match both. Clicking the "×" on the right-side will remove that filter.

## Changing Item Status
By selecting the checkbox to the left of an item you are given the option to delete it. Deleting items is permanent and should be done with care. If the table has *Status* enabled then items are "soft-deleted" – meaning they are permanently removed but can be retrieved by an Administrator. Tables with Status enabled may also have additional options for items such as "Draft".

*Default Status Options:*

* **Active** – These items are considered live/published
* **Draft** – These items are grayed out and typically not shown within your project
* **Deleted** – These items are not visible within Directus and should not be shown within your project

> **Developer Note:** When enabling Status on a table, remember to only fetch active items (`active=1`) in your project's data queries.

## Sorting
Clicking column headers will sort the data by that field. Clicking a column again will reverse the sort direction – clicking a third time will remove sorting reverting to the default order: date created. This is automatically saved on a per user basis and is persistent until changed.

## Reordering
While sorting simply changes the current view of the items, reordering actually _saves_ the order within each item. For tables that have Reordering enabled, items will automatically show a handle on the left side of their row for drag-and-drop interaction. To reorder items (or see the saved order) you must click on the "double arrows" icon at the top of that far-left column.

> **Developer Note:** While reordering is an excellent way to curate the order of items, for tables with large datasets it becomes unwieldy and should not be used.

## Bulk Editing
When selecting the checkboxes for multiple items an option to “Batch Edit” will appear. Clicking this button will take you to a blank edit page where bulk edits can be made. When bulk editing, you must enable each field you wish to edit – all enabled fields will save that value for _all_ selected items.

> **Caution:** Use this feature with care as it is easy to overwrite data for a large number of items.

## Customizing the View
By default the item listing page shows a tabular view with the first few columns visible. However users can adjust how to visualize items and which columns they see by clicking the "three dots" icon on the right-side of the header. Core view options include:

### Table
The default view – this option is always available.

* **Chart:** – Choose a NUMERIC and DATE/TIME column to add a visual chart to the top of the table showing data from the filtered items.
* **Spacing:** – Choose between Cozy, Comfortable, and Compact.
* **Columns:** – Select columns you wish to be visible and drag to reorder them.
* **System:** – Additional system options include:
    * **Item Numbers** – Toggles an incremented number beside each item (not to be confused with the unique ID)
    * **Last Edited On** – Toggles the date the item was last edited
    * **Show Comments** – Toggles the comment count for each item
    * **Revisions** – Toggles the revision count for each item
    * **Show Footer** – Toggles a footer that gives additional values for filtered items:
	    * **SUM** – Adds up all values from all filtered items
	    * **MIN** – Shows the lowest value within all filtered items
	    * **MAX** – Shows the highest value within all filtered items
	    * **AVG** – Shows the average of all values within all filtered items

### Tiles
An alternate view, available when there is at least one FILE interface within the table.

### Calendar
An alternate view, available when there is at least one DATE/TIME interface within the table.

### Map
An alternate view, available when there is at least one LOCATION interface within the table.