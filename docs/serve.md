# clea serve

> Build the application and launch a server with hot reload

## Options

```bash
clea help serve
```

`--verbose` (`-V`) verbose mode.

`--target [env]` build the application with the targeted environment (defaults to: **development**). [Details](more/environments.md).

`--host [host]` host to listen to (defaults to: **localhost**). Can be set to **0.0.0.0** to access on local network.

`--port [port]` the port to serve the application (defaults to: **8080**).

`--https` flag to turn on HTTPS.

`--progress` display a compilation progress (defaults to: **false**).

`--api [db]` enable the mock API on the specified database JSON file (defaults to: **db.json**). [Details](more/api.md).

`--json-server-route [route]` add custom routes to json-server definition (defaults to: **json-server.js**). [Details](more/api.md).

`--proxy-config [config]` proxy configuration file. [Details](more/proxy.md).

`--merge-config [config]` merge the given webpack configuration with the existing one.

`--override-config [config]` override the existing webpack configuration by the given one.
