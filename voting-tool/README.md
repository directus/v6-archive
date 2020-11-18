# voting-tool
A simple tool for accepting community submissions (eg: feature requests) that can be voted into a priority ranking

## Installation

Clone this repo and install the NPM dependencies by running `npm install`.

You will need to create a `.env` file in the root of the project. The contents of this file are:

```
DIRECTUS_URL=https://example.com/api
DIRECTUS_ACCESS_TOKEN=123456

GITHUB_CLIENT_ID=123456
GITHUB_CLIENT_SECRET=123456
GITHUB_CALLBACK_URL=http://example.com
```

