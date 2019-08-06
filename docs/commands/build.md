# clea build

> Compiles the application into an output directory

## Options

```bash
clea help build
```

`--verbose` (`-V`) verbose mode.

`--target [env]` build the application with the targeted environment (defaults to: **development**). [Details](../more/environments.md).

`--output-path [path]` build the application into this path (defaults to: **dist/**).

`--base-href [url]` base url for the application being built (defaults to: **/**).

`--compress` enable gzip compression.

`--sourcemap` output sourcemaps.

`--doc` generate the documentation with [TypeDoc](http://typedoc.org/).

`--progress` log progress to the console while building.

`--merge-config [config]` merge the given webpack configuration with the existing one.

`--override-config [config]` override the existing webpack configuration by the given one.
