# Riot.JS and loopback

This project would be an example how use riot.js, loopback and some library like riot gear router.

# Target
This application would emulate a [single page application](https://en.wikipedia.org/wiki/Single-page_application) with a contact list and a search bar.

# What we used:

  - [Riot.js](http://riotjs.com/)
  - [Bootstrap](http://getbootstrap.com/)
  - [rg-router](https://github.com/RiotGear/rg-router)
  - [Loopback](https://loopback.io/)
  - [Mongodb](https://www.mongodb.com/it)

### Installation

This project requires [Node.js](https://nodejs.org/) v4+ to run and Mongodb installed.

Install the dependencies and devDependencies and start the server.

```sh
$ cd project\folder
$ npm install
$ bower install
```
Riot tag can be precompilated, installing before the compile:
```sh
$ npm install -g riot
```
To start the application use:
```sh
node .
```

### Use test data
After setup and start the application, you can insert some test data on the database:
```sh
http://localhost:3000/explorer/
```
Access to this page, and insert some value using the put test api.

Example:
{
  "name": "Giovanni",
  "surname": "Montenegro",
  "number": "789",
  "alias": "alias",
  "search_key": "Giovanni_Montenegro_789_alias",
}

### Precompilation
If you want make some changes, add some feature to the client side, you can precompile the tags with the following command:
```sh
$ riot ./client/tags ./client/build/bundle.js
```

# About me

**Giovanni Montenegro**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [![alt text][1.1]][1] [![alt text][2.1]][2]

[1.1]: https://cdn1.iconfinder.com/data/icons/social-signature/512/Linkedin_Color-48.png
[2.1]: https://cdn2.iconfinder.com/data/icons/social-icons-color/512/gmail-32.png
[1]: https://www.linkedin.com/in/giovanni-montenegro-147669b7/
[2]: <mailto:giovanni.montenegroit@gmail.com>
