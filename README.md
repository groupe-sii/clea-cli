<p align="center">
  <img alt="Clea" src="https://github.com/groupe-sii/clea-cli/blob/master/assets/clea.png?raw=true" />
</p>

<p align="center">CLI tool for AngularJS & Typescript projects</p>

<p align="center">
  <a href="https://travis-ci.org/groupe-sii/clea-cli"><img alt="Travis Status" src="https://travis-ci.org/groupe-sii/clea-cli.svg"></a>
  <a href="https://npmjs.org/package/clea"><img alt="NPM version" src="https://badge.fury.io/js/clea.svg"></a>
  <a href="https://david-dm.org/groupe-sii/clea-cli"><img src="https://david-dm.org/groupe-sii/clea-cli.svg" alt="npm dependencies"></a>
  <a href="https://david-dm.org/groupe-sii/clea-cli?type=dev"><img src="https://david-dm.org/groupe-sii/clea-cli/dev-status.svg" alt="npm devDependencies"></a>
  <a href="http://opensource.org/licenses/MIT"><img src="http://img.shields.io/badge/license-MIT-brightgreen.svg" alt="MIT badge"></a>
</p>

---

The CLI requires NodeJS >= 6.9.0 and NPM 3 or higher.

# Usage

## Installation

```bash
npm install clea -g
```

## Options

```bash
clea help
# or
clea help [command]
```

# How to start ?

```bash
clea new <app-name>
cd <app-name>
clea serve
```

Go to http://localhost:8080/. Hot reload is active by default.

To see the `clea serve` options & details, go check the [documentation](https://github.com/groupe-sii/clea-cli/blob/master/docs/serve.md).

## Progressive Web App

You can generate basic Progressive Web App support with the following `clea new <app-name> --make-it-progressive`.

[Learn more](docs/more/make-it-progressive.md)

# Generate some entities

The `clea generate` command allows you to easily generate entities in your application.

```bash
clea generate [entity] my-new-entity

# Support relative path
# If you are under the src/app/feature/ folder, and launch:
clea generate [entity] my-new-entity
# Your new entity will be generated under the src/app/feature/my-new-entity folder

# But, if you are still in the src/app/feature/ folder, and launch:
clea generate [entity] ../my-newer-entity
# Your entity will be generated in the src/app/my-newer-entity folder
```

Available entities:

Entity                  | Usage
---                     | ---
Component               | `clea generate component my-new-component`
Directive               | `clea generate directive my-new-directive`
Filter                  | `clea generate filter my-new-filter`
Service                 | `clea generate service my-new-service`
Module                  | `clea generate module my-new-module`

[Learn more](https://github.com/groupe-sii/clea-cli/blob/master/docs/generate.md)

# Upgrade Clea

To upgrade Clea to it's latest version, you must upgrade the global and local package.

For the global package:

```bash
npm uninstall -g clea
npm cache clea
npm install -g clea
```

For a local project:

```bash
rm node_modules -rf
npm install --save-dev clea
npm install
```

# Documentation

The documentation can be found under the [docs](https://github.com/groupe-sii/clea-cli/tree/master/docs) folder.

# License

MIT License
