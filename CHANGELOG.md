# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

### Breaking changes

- There is now a dedicated entry for the main module file, between `root` and `environmentSource` in `.clea-cli.json`:

  ```json
  {
    "root": "src",
    "main": "app/app.module.ts",
    "environmentSource": "config/config.json"
  }
  ```
  
### Fixed

- **webpack**: duplicate declaration of `config` variable was causing build errors [@ValentinGot]

## [0.0.1-rc.2](https://github.com/groupe-sii/clea-cli/compare/0.0.1-beta.rc.1...0.0.1-rc.2) - 2017-04-06

### Added

- **build**: add `--compress` option to gain ~70% compression ratio with [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin) [@ValentinGot]

For an hello world app:

Bundle      | Entry      | Emitted   | Compressed (gzip)
---         | ---        | ---       | ---
main        | 4.36 kB    | 2.33 kB   | 907 bytes
vendor      | 2.57 MB    | 440 kB    | 144 kB
styles      | 70 kB      | 28.4 kB   | 9.11 kB
  
- **new**: add `--commit-message-conventions` options to enable the hook commit-msg with the [google conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit) (Closes [#15](https://github.com/groupe-sii/clea-cli/issues/15)) [@kgrandemange]
- **completion**:  add a `clea completion` command (Closes [#8](https://github.com/groupe-sii/clea-cli/issues/8)) [@kgrandemange]

### Fixed

- **blueprints**: add ngInject annotation by default on component's controller [@ValentinGot]

## [0.0.1-rc.1](https://github.com/groupe-sii/clea-cli/compare/0.0.1-beta.6...0.0.1-rc.1) - 2017-03-29

### Breaking changes

- Clea package has been moved to `@clea/cli`.

  If you're using Clea `beta.6` or less, you need to uninstall `clea` package.
  
  ```bash
  npm uninstall -g clea
  npm uninstall --save-dev clea
  ```
  
  To upgrade Clea to it's latest version, you must upgrade the global and local package.

  For the global package:
  
  ```bash
  npm cache clean
  npm install -g @clea/cli
  ```
  
  For a local project:
  
  ```bash
  rm node_modules -rf
  npm install --save-dev @clea/cli
  npm install
  ```

- A `spec` entry has been added to the `.clea-cli.json`. Add it to the end of the file:

  ```json
  "spec": {
    "component": true, 
    "directive": false, 
    "filter": false, 
    "service": true, 
    "module": true 
  } 
  ```
  
- Take advantage of Tree Shaking by importing the `vendor.ts` directly in the `app.module.ts` file:

  ```typescript
  import '../vendor'; 
  ```
  
- The styles bundle is now separated. So you have to remove the `main.scss` import from the `app.module.ts` file. Line to remove:
  
  ```typescript
  import '../styles/main.scss'; 
  ```
  
- `angular-mocks` is now imported by the Karma configuration. Remove it from the `vendor.ts` file or it will break your tests. Line to remove:

  ```typescript
  import 'angular-mocks'; 
  ```
  
### Added

- **tree-shaking**: change the webpack configuration to take advantage of tree shaking [@ValentinGot]
- **base-href**: add a `--base-href [url]` option to easily configure the `<base href="" />` tag [@ValentinGot]
- **spec**: generate spec files based on the `spec` entry in the configuration file (Closes [#11](https://github.com/groupe-sii/clea-cli/issues/11)) [@ValentinGot]

### Updated

- **styles**: change the webpack configuration to export a `styles.bundle.js` [@ValentinGot]
- **spec**: use beforeAll hook to follow AngularJS's [guidelines](https://docs.angularjs.org/guide/unit-testing#using-beforeall-) [@ValentinGot]

### Fixed

- **build**: now providing an absolute path for webpack `configuration.output.path` (Closes [#13](https://github.com/groupe-sii/clea-cli/issues/13)) [@ValentinGot]
- **progress**: progress in now shown on the same line [@ValentinGot]
- **generate**: throw an error if no name has been specified [@ValentinGot]
- **test**: just load angular-mocks in karma configuration file [@ValentinGot]

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

## [0.0.1-beta.2](https://github.com/groupe-sii/clea-cli/compare/0.0.1-beta.1...0.0.1-beta.2) - 2017-03-13

### Fixed

- **templates**: add `clea` package to generated projects [@ValentinGot]

## 0.0.1-beta.1 - 2017-03-13

Releasing the first version of `clea` [@ValentinGot] [@liollury]

[@kgrandemange]: https://github.com/kgrandemange
[@liollury]: https://github.com/liollury
[@ValentinGot]: https://github.com/ValentinGot
