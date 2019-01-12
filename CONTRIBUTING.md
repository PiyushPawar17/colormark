# Contributing Guidelines

## Setup

-   Fork Repository.

-   Clone Repository.

```sh
git clone https://github.com/{Your_Username}/colormark.git
cd decode
```

-   Create `keys_dev.js` file in config folder with the following data:

```js
module.exports = {
	mongoURI: YOUR_MONGO_URI,
	clientID: YOUR_GOOGLE_CLIENT_ID,
	clientSecret: YOUR_GOOGLE_CLIENT_SECRET,
	cookieKey: YOUR_COOKIE_KEY
};
```

## Contributing

-   Have a look at the open issues. Pick an unassigned issue or create one.

-   Create a new branch and make changes.

-   Send a Pull Request after making changes.
