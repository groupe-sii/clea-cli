# akg serve

> Build l'application est lance le serveur web

## Options

```bash
akg help serve
```

`--verbose` (`-V`) affiche des informations plus détaillées.

`--target [env]` sélectionne l'environnement avec lequel doit être buildé l'application. Voir [environments.md](environments.md) pour plus de détails. **development** par défaut.

`--host [host]` hôte que le serveur doit écouter. **localhost** par défaut. Peut être positionné à **0.0.0.0** pour accèder à l'application sur votre réseau locale.

`--port [port]` port sur lequel servir l'application.

`--https` activer le mode HTTPS.

`--progress` affiche une état de la compilation.

`--api [db]` active l'API de mock sur le fichier JSON en argument. **db.json** par défaut.

`--json-server-route [route]` Defini un fichier de configuration du serveur express (défaut: json-server.js)

`--proxy-config [config]` fichier de configuration pour le proxy. [proxy.md](proxy.md) pour plus de détails.

`--merge-config [config]` merge la configuration webpack avec l'éxistante.

`--override-config [config]` remplace totalement la configuration webpack existante par celle-ci.
