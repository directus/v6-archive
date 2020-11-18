# Item Detail

This page displays all the fields the current user has permission to view. The Create, Edit, and Bulk Edit pages are all essentially the same, except for the content within the fields. Fields may have a note/comment to further explain their purpose, or an asterisk (`*`) beside their label if required.

## Saving
Once you've added or edited content, clicking the Save (`✓`) button in the header will save the item and return you to the Item Listing page. For additional save options you can click the "three dots" icon on the top of this button:

* **Save** – (Primary Action) Saves changes and returns you to the item listing page
* **Save and Stay** – Saves changes and keeps you on the edit page
* **Save as Copy** – Saves the current item (with changes) as a _new_ item, the original item you opened is unchanged
* **Save and Add** – Saves changes and takes you to a blank new item page for that table – useful when repetitively adding items

## Item Comments
You can leave comments on items within the right sidebar. You can mention specific users or groups with the "@" character. When mentioned in comments, users will receive a Directus notification and an accompanying email (if enabled within their preferences).

## Revisions & Rollbacks
Every change made by users within Directus is tracked to comprehensive accountability. You can view the following details of each revision in the right-sidebar: The user, their IP address and user-agent, and the date/time of the change. Any changed data (delta) and a _complete_ item backup are all saved for all revisions – you can Rollback to any previously saved state.

## Translations
If you have set up a translations interface, the item detail page will show a translations section at the bottom of the page which allows you to add in content for different fields in multiple languages.

> **Note:** If you'd like to know more about setting up the translations interface, checkout [this tutorial on Medium](https://medium.com/directus/multilingual-content-setup-in-directus-i18n-4f243f72e554).
