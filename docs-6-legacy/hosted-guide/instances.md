# Hosted Instances

### Creating Instances
Once you have added payment info into your account you can easily and quickly add new instances. Just click on the "Create Instance" button in the header, fill in an instance name, and choose a plan – that's it. Names should be lowercase alphanumeric with dashes instead of spaces – choose your instance name carefully as that will determine your database name and API URL. It should only take a few second for your database and Directus CMS to be set up. Then, once you've created a schema and content, your dynamic API will be available.

### Managing Instances
Once you've created a few instances, you can easily manage them all in one place from the Instances section. In addition to changing your instance's plan (resizing), you will also be presented with other details, including:

* Table Count
* User Count
* Total Item Count
* Used & Available Asset Storage
* Used & Available Asset Bandwidth
* Used & Available Monthly API Requests
* Used & Available Monthly API Bandwidth

You will also be able to see all of your API users/keys listed here. Each Directus user has an associated API key that inherits its data privileges. Keys can be be updated within the instance's Directus Users section.

### Deleting Instances
You can delete instances from their detail page. There are three levels of confirmation to ensure you do not accidentally destroy instances. The following is permanently destroyed when deleting an instance:

* The database
* All data and content within the database
* The Directus CMS
* All associated assets
* All API endpoints (404)