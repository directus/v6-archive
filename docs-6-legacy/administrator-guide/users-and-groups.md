# Users, Groups, & Permissions

> **Note:** Only Administrators have access to these pages and settings.

There is no limit to how many users or groups you can add within Directus. Your first user (created during installation) is always part of the system's Administrator Group. Subsequent users can either be assigned to the Administrator Group (unrestricted access to tables and settings) or to any other custom group with specific permissions.

## Creating New Groups
1. Navigate to the _Settings > Group & Permissions_
2. Click the (+) button at the top of the page
3. Setup the group options below:

#### Group Options

* **Name:** A unique name for the group
* **Description:** Describe the purpose of the user group
* **IP WhiteList:** Allows for a CSV of IP addresses that users are allowed to access Directus from. This is ignored if empty.
* **Allow Uploads:** Toggles the ability for users of this group to upload files
* **Allow Messaging:** Toggles the ability for users of this group to use the messaging and commenting system
* **Allow Edit Profile:** Toggles the ability for users of this group to change their own profile
* **Users:** This shows all users of the group and allows you to add/remove each
* **Permissions:** Granular permissions for each table

## Permissions
Group have granular permissions for each table saved into `directus_privileges`, below are the possible settings:

#### View

| Access	| Value		| Description
|-----		|-----		|-----
| `All`  		| `3` 		| The user can view all table items
| `Group`  	| `2` 		| The user can only view table items created by users within their group
| `User`  	| `1` 		| The user can only view table items they created themselves
| `None`  	| `0` 		| The user can not see any of this table's items

#### Add

| Access	| Value		| Description
|-----		|-----		|-----
| `All`  		| `1` 		| The user can add new items to this table
| `None`  	| `0` 		| The user can not add new items to this table

#### Edit

| Access	| Value		| Description
|-----		|-----		|-----
| `All`  		| `3` 		| The user can edit all table items
| `Group`  	| `2` 		| The user can only edit table items created by users within their group
| `User`  	| `1` 		| The user can only edit table items they created themselves
| `None`  	| `0` 		| The user can not edit any of this table's items

#### Delete

| Access	| Value		| Description
|-----		|-----		|-----
| `All`  		| `3` 		| The user can delete all table items
| `Group`  	| `2` 		| The user can only delete table items created by users within their group
| `User`  	| `1` 		| The user can only delete table items they created themselves
| `None`  	| `0` 		| The user can not delete any of this table's items

> **Note:** User/Group options require the table having a `directus_tables.user_create_column` set.

#### Column Read Blacklist
Click this area to select any fields that this group can not view.

#### Column Write Blacklist
Click this area to select any fields that this group can not edit.

#### Status (Workflows)
All of the above permissions apply across the board. If the table has a status column, you can also click the "Workflow" icon to set different permissions for **each** status state. 

*Workflow Example: Intern Group*

1. Interns can create new `Blog` items (default to status: draft)
2. Interns can edit all `Blog` drafts
3. Interns can view all live `Blog` items, but can not edit them

#### Show in Sidebar
The `nav_listed` toggle allow you to hide certain tables from the Directus sidebar and table listing. In certain cases you may want records to be visible throughout the CMS (eg relational modals) but you don't need that table listed prominently otherwise. 

#### Navigation Override
You can also add a JSON `directus_groups.nav_override` to achieve similar results, but for simply hiding a few tables that might be overkill.

*Example of navigation override:*
@TODO

## Deleting User Groups
@TODO

## Creating New Users
1. Navigate to the _Users_ page from the sidebar
2. Click the (+) button at the top of the page
3. Fill in the applicable fields. Required fields include:
    * First Name
    * Last Name
    * Email
    * Password
    * Group
4. Click the Save Button
