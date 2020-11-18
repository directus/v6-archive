/**
 * Instantiates Directus SDK for easier use in other files
 */
const DirectusSDK = require('directus-sdk-javascript/remote');
require('dotenv').config();

const client = new DirectusSDK({
  url: process.env.DIRECTUS_URL,
  accessToken: process.env.DIRECTUS_ACCESS_TOKEN
});

/**
 * Convenience function which will fetch a single item's ID and delete that
 *   particular item
 * @param  {String} tableName
 * @param  {Object} [params={}] [description]
 * @param  {Object} [data={}]   [description]
 * @return {Promise} resolves empty
 */
client.findAndDeleteItem = async function(tableName, params = {}, data = {}) {
  // Limit the amount of returned objects from the API to 1,
  //   since we're only looking if a specific one exists
  params = Object.assign({}, params, {
    limit: 1
  });

  const { data: userProfiles } = await this.getItems(tableName, params);

  const id = userProfiles[0].id;

  return this.deleteItem(tableName, id);
};

/**
 * Convenience function which will check if an item exists based on the params
 *   given and will create a new one with the passed data if not
 * @param  {[type]} tableName   Name of the table in the Directus instance
 * @param  {Object} [params={}] Parameters to search for
 * @param  {Object} [data={}]   Data of to-be-created item
 * @return {Promise} resolves with data object, rejects if error in API
 */
client.getOrCreateItem = function(tableName, params = {}, data = {}) {
  return new Promise(async (resolve, reject) => {
    // Limit the amount of returned objects from the API to 1,
    //   since we're only looking if a specific one exists
    params = Object.assign({}, params, {
      limit: 1
    });

    // Fetch the item from Directus
    const { data: result } = await this.getItems(tableName, params);

    // If the requested item has been found, resolve the promise
    if (Array.isArray(result) && result.length > 0) {
      return resolve(result[0]);
    }

    // If it hasn't been found, create the item and resolve the newly
    //   created item
    this.createItem(tableName, data)
      .then(res => res.data)
      .then(resolve)
      .catch(reject);
  });
};

module.exports = client;
