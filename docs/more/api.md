# Mock API

Grâce à l'option `--api` il est possible de mocker une API REST.

Référez vous à la documentation de JSON Server pour son utilisation. https://github.com/typicode/json-server.

Par défaut, c'est le fichier `db.json` qui est fait office de base de données.

## Proxy

En utilisant l'option `--api`, un proxy est mis en place pour permettre d'accèder au serveur via l'URL **/api** (http://localhost:8080/api par défaut).

Si un autre proxy est configuré sur l'URL /api, il sera alors ignoré et celui-ci prendra le dessus.

## Custom mock

Il est possible d'ajouter des routes personnalisées en passant par le fichier json-server.js à la racine du projet.
Celui-ci est déjà configurer pour mocké la partie authentification.
