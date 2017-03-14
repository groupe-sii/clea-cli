# Make it Progressive

> Clea allows you to generate an application with default Progressive Web App support.

## Usage

```bash
clea new <app-name> --make-it-progressive
```

## Structure

These file are generated or modified by the Progressive Web App support option:

- **sw.conf.js**: sw-precache and sw-toolbox configuration file.
- **src/public/index.html**: add <head> metadata for PWA support and Service Worker registration.
- **src/public/manifest.json**: manifest file describing the application.
- **src/public/assets/launcher/**: some default launcher icons.

## Web app manifest

The app manifest is declared with a **manifest.json** file located under **src/public/** folder.

The web app manifest is a simple JSON file that gives you the ability to control how your app appears to the user.

More information about manifest file format [over here](https://developer.chrome.com/extensions/manifest).

## [sw-precache](https://github.com/GoogleChrome/sw-precache)

With the `sw-precache` support, your application will automatically generate a service worker that precaches your static resources (App Shell).

## [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)

It provides some simple helpers and strategies to cache your dynamic contents.

`sw-toolbox` is used alongside `sw-precache`: https://github.com/GoogleChrome/sw-precache/blob/master/sw-precache-and-sw-toolbox.md.

## Configuration

All the sw-precache / sw-toolbox configuration is available in the `sw.conf.js` file, located at your root folder.

You can use most of the [sw-precache options](https://github.com/GoogleChrome/sw-precache#table-of-contents) except these ones:

* `cacheId`: which is automatically set using the `name` property of your `.clea-cli.json` file
* `filename`: which is always at `service-worker.js`
* `stripPrefix`: it's always stripping the `--output-path` option value.

To configure sw-toolbox, you can use the [`runtimeCaching`](https://github.com/GoogleChrome/sw-precache#runtimecaching-arrayobject) property.

### runtimeCaching

For example, if you want to cache the response of `https://jsonplaceholder.typicode.com/users`, you can make the following configuration:

```javascript
module.exports = {
  runtimeCaching: [
    {
      handler: 'cacheFirst',
      urlPattern: /\/users/,
      options: {
        origin: /jsonplaceholder\.typicode\.com/
      }
    }
  ]
};

```
