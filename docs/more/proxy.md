# Proxy vers le Backend

En utilisant le mode proxy de Webpack dev server, il est possible de rediriger certaines URLs pour les envoyer vers un serveur. Pour cela il faut passer un fichier de configuration à la commande `--proxy-config`.

Pour plus de détails sur les possibles configuration du mode proxy, référez vous à la documentation de Webpack Dev Server: [Webpack Dev Sever - Proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy).

> **Information**
> Cette option est seulement disponible avec la commande `akg serve`.

## Example

Cas d'usage:

* Un serveur d'APIs tourne sur l'URL http://localhost:3000;
* Votre application tourne sur l'URL http://localhost:8080;
* Nous souhaitons rediriger tous les appels à l'URL http://localhost:8080/api vers le serveur d'API.

Pour cela, il suffit de créer un fichier `proxy.conf.json` à la racin de votre projet dont le contenu serait:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

Ensuite, il vous faut lancer la commander suivante:

```bash
akg serve --proxy-config proxy.conf.json
```
