# WordPress Plugin Boilerplate

## Description

This is a WP plugin boilerplate with Webpack to build assets.

## Features

- Webpack for compiling assets and minify
- Sass for styles
- ES6 module support

## Compile assets

Run `npm install` to install the dependencies.

### Development

The command below compile the assets with source map to help when developing your plugin.

```sh
npm start
```

This command will run webpack with `--watch` and in development mode `--mode development`.

To build without `--watch` option, just run `npm build`.

### Production

Use the `build-prod` to build assets minified and with a hash on file name.

```sh
npm run build
```
