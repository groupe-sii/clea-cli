# Mock API

Thanks to the `--api` option, it's possible to easily mock a REST API with JSON Server.

Please refer to the JSON Server [documentation](https://github.com/typicode/json-server) for more information.

The default database file is `db.json`, but you can change it to whatever you want.

## Proxy

By using the `--api` option, a proxy is set to the **/api** URL (defaults to: http://localhost:8080/api).

If an other proxy is defined on the same URL (/api), it will be ignored and this one will takeover.

## Custom mock

If you want something more than a RESTFul mock, you can create your own Express routes in the **api.conf.js** file

The configuration file can be change with the `--api-custom-routes [config]` option.
