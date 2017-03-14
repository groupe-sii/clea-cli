# Environments

`clea serve` and `clea build` commands allows you to use the `--target=environment` option to specify the configuration file to be used.

By default, the development environment is used (`config.dev.json`).

The mapping used to determine which environment file is used can be found in `.clea-cli.json`:

```json
"environmentSource": "config/config.json",
"environments": {
  "development": "config/config.dev.json",
  "production": "config/config.prod.json"
}
```

The source environment will always be merged with the selected environment.

> **Disclaimer**
> 
> The path to the environment file should be relative to the `root` (configurable in .clea-cli.json) folder of your project

## Access it

To access the environment configuration in your application, just inject the `CONFIG` constant:

```typescript
export class AppController {

  constructor (
    private ENVIRONMENT,
    private CONFIG,
  ) {
    console.log(this.ENVIRONMENT, this.CONFIG);
  }

}
```

The `ENVIRONMENT` constant will show you the current environment name.

## New

You can create new environment files by doing the following:

* create a `src/config/config.NAME.json`
* add `{ "NAME": "config/config.NAME.json" }` in `.clea-cli.json`
* use it with `--target=NAME` option
