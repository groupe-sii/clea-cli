# Proxy to Backend

Using the proxy mode of Webpack dev server, it's possible to redirect some URLs to another server. To do so, you must give a configuration file to the `--proxy-config` option.

For more details on how to use the proxy configuration, please refer to: [Webpack Dev Sever - Proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy).

> **Information**
> 
> This option is only available with the `clea serve` command.

## Example

Use case:

* A REST server is running on http://localhost:3000 ;
* Your application is running on http://localhost:8080 ;
* You want to redirect each call to http://localhost:8080/api to the REST Server.

To do so, you must create a `proxy.conf.json` file which will contain the following configuration:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

Then, launch the following command:

```bash
clea serve --proxy-config proxy.conf.json
```
