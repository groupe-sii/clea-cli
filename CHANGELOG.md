# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

## [0.0.1-beta.6](https://github.com/groupe-sii/clea-cli/compare/0.0.1-beta.5...0.0.1-beta.6) - 2017-03-27

### Updated

- **make-it-progressive**: register the service worker inside the angular context [@ValentinGot]

### Fixed

- **build**: UglifyJsPlugin warnings should only be visible in verbose mode [@ValentinGot]
- **build**: CleanWebpackPlugin infos should only be visible in verbose mode  [@ValentinGot]
- **ui-framework**: missing angular-material typings [@ValentinGot]
- **blueprint-module**: ng-annotate with lazy-loading is now working when builded (Closes [#12](https://github.com/groupe-sii/clea-cli/issues/12)) [@ValentinGot]
- **angular-toastr**: it shouldn't be installed by default [@ValentinGot]

## [0.0.1-beta.5](https://github.com/groupe-sii/clea-cli/compare/0.0.1-beta.4...0.0.1-beta.5) - 2017-03-17

### Added

- **test**: add a `--watch` option to rerun tests when files change (Closes [#9](https://github.com/groupe-sii/clea-cli/issues/9)) [@ValentinGot]
- **test**: add a `--single-run` option to run tests only once (Closes [#10](https://github.com/groupe-sii/clea-cli/issues/10)) [@ValentinGot]

### Fixed

- **service**: the service name in generated spec file  should be camelized [@ValentinGot]
- **service**: the AppModule is now always loaded in the spec file (Closes [#7](https://github.com/groupe-sii/clea-cli/issues/7)) [@ValentinGot]
- **component**: the AppModule is now always loaded in the spec file (Closes [#7](https://github.com/groupe-sii/clea-cli/issues/7)) [@ValentinGot]
- **tests**: add images, fonts and json loader on karma webpack config [@ValentinGot]
- **tsconfig**: allow use of es6 polyfills with TypeScript ([TypeScript #6974](https://github.com/Microsoft/TypeScript/issues/6974)) [@ValentinGot]

## [0.0.1-beta.4](https://github.com/groupe-sii/clea-cli/compare/0.0.1-beta.3...0.0.1-beta.4) - 2017-03-15

### Added

- **api**: RESTFul mocks with json-server integration [@ValentinGot]
- **docs**: add some documentation [stories](https://github.com/groupe-sii/clea-cli/tree/master/docs/more) (Closes [#1](https://github.com/groupe-sii/clea-cli/issues/1)) [@ValentinGot]
- **new**: initialize a git repository when installation is done (Closes [#5](https://github.com/groupe-sii/clea-cli/issues/5)) [@ValentinGot]
- **new**: add a `--skip-git` option to skip the git initialization [@ValentinGot]

### Updated

- **make-it-progressive**: the Web App Manifest is always generated, not need to use `--make-it-progressive` [@ValentinGot]
- **library**: `--lib` has been deactivated for now. Needs a lot of fixes [@ValentinGot]

### Fixed

- **templates**: missing `angular-cookies` import [@ValentinGot]
- **ui-framework**: make angular-material icons work [@ValentinGot]
- **ui-framework**: make angular-ui-bootstrap work [@ValentinGot]
- **generate**: a component, directive or filter name should be camelized when registered (Closes [#6](https://github.com/groupe-sii/clea-cli/issues/6)) [@ValentinGot]

## [0.0.1-beta.3](https://github.com/groupe-sii/clea-cli/compare/0.0.1-beta.2...0.0.1-beta.3) - 2017-03-14

### Added

- **make-it-progressive**: add a `--make-it-progressive` option to scaffold a Progressive Web App when using `clea new` or `clea init` (Closes [#2](https://github.com/groupe-sii/clea-cli/issues/2)) [@ValentinGot]
- **make-it-progressive**: add server support with [sw-precache-webpack-dev-plugin](https://github.com/ragingwind/sw-precache-webpack-dev-plugin) (Closes [#3](https://github.com/groupe-sii/clea-cli/issues/3)) [@ValentinGot]

### Fixed

- **tests**: the karma configuration file location was wrong. It's under **clea/** folder and not **clea-cli/** [@ValentinGot]
- **webpack**: stop removing the **dist/** folder when serving the application with `clea serve` [@ValentinGot]

## [0.0.1-beta.2](https://github.com/groupe-sii/clea-cli/compare/0.0.1-beta.1...0.0.1-beta.2) - 2017-03-13

### Fixed

- **templates**: add `clea` package to generated projects [@ValentinGot]

## 0.0.1-beta.1 - 2017-03-13

Releasing the first version of `clea` [@ValentinGot] [@liollury]

[@liollury]: https://github.com/liollury
[@ValentinGot]: https://github.com/ValentinGot
