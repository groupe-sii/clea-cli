# clea lint

> launch code analysis

## Options

```bash
clea help lint
```

`--fix` will attempt to fix lint errors.

`--force` will always return error code 0 even with lint errors. It also launches all linters, whether there is errors or not.

## TypeScript

Based on `tslint.json`. If file doesn't exists, TSLint task will be ignored with a warning.

## SASS

Based on `.sass-lint.yml`. If file doesn't exists, SASSLint task will be ignored with a warning.
