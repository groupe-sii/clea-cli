# Performance

> Clea can notify you of assets and entry points that exceed a specific file limit.

## Configuration

The configuration can be found in the `.clea-cli.json` file:
```json
{
  "performance": {
    "hints": "warning",
    "maxEntrypointSize": 2000000,
    "maxAssetSize": 2000000
  }
}
```

Please refer to the [Webpack performance](https://webpack.js.org/configuration/performance/) section for mor information about configuration.

