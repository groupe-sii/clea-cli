# README

## Table of contents

1. [Installation](#installation)
1. [Scripts](#scripts)
1. [Contribute - Git](#contribute-git)
1. [Documentation](#documentation)
1. [Styling](#styling)

## Installation

```sh
$ npm install               # Development
$ npm install --production  # Production (only `dependencies`)
```

## Scripts

- `npm start` to launch a webpack-dev-server server on your source files
- `npm run build` to build an optimized version of your application in /dist
- `npm run build:prod` to build an optimized version of your application in /dist in a **production** environment
- `npm run test` to launch your unit tests with Karma
- `npm run lint` to launch linting process
- `npm run sonar:reporters` to create the linters reporters for SonarQube plugin

## Contribute - Git

See [commits convention](COMMITS-CONVENTION.md).

## Documentation

Angular documentation is generated with [DGeni](https://github.com/angular/dgeni)

Docs generation is performed by [webpack-angular-dgeni-plugin](https://github.com/groupe-sii/webpack-angular-dgeni-plugin/)

Please refer to [Angular documentation](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation) for documentation comments.

### Launch

Documentation is launched by adding `--doc` argument to the build command. Which is already done by default by `build:prod` NPM script.

```bash
clea build --doc
```

## Styling

See styling [guidelines](src/styles/README.md).
