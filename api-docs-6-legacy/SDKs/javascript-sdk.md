
# Installation & Usage

Install the package via npm
`npm install directus-sdk-javascript`

Initialize the SDK object with your the desired api key and url

```javascript
const RemoteInstance = require('directus-sdk-javascript/remote');

const client = new RemoteInstance({
  'http://directus.url/api/1.1', // Directus-hosted or own server
  accessToken: 'api-key-12345' // [optional]
});
```

Every endpoint returns a promise which resolves the APIs JSON on success and rejects on an error:

```javascript
client.getItems('projects')
  .then(res => console.log(res))
  .catch(err => console.log(err));
```
