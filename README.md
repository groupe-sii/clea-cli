<p align="center">
  <img alt="Clea" src="assets/clea-text.png" />
</p>

<p align="center">CLI tool for AngularJS & Typescript projects</p>

<p align="center">
  <a href="https://travis-ci.org/groupe-sii/clea-cli"><img alt="Travis Status" src="https://travis-ci.org/groupe-sii/clea-cli.svg"></a>
  <a href="https://npmjs.org/package/clea"><img alt="NPM version" src="https://badge.fury.io/js/clea.svg"></a>
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

To see the `clea serve` options & details, go check the [documentation](docs/serve.md).

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

[Learn more](docs/generate.md)

# Documentation

The documentation can be found under the [docs](docs/) folder.

# License

MIT License
