# Environnements

Les commandes `akg serve` et `akg build` permettent d'utiliser une option `--target=environment` pour spécifier le fichier de configuration qui sera utilisé.
Par défaut, c'est l'environnement de développement qui est ciblé (`config.dev.json`).

Le mapping pour déterminer quel fichier doit être utilisé en fonction de la cible choisie se fait dans le fichier `akg.json`:

```json
"environments": {
  "source": "config/config.json",
  "development": "config/config.dev.json",
  "production": "config/config.prod.json"
}
```

> **Attention**
> L'environnement `source` doit toujours être présent car il est mergé avec l'environnement cible. Ce qui permet d'avoir une configuration globale ou plus granulaire de votre application.

> **Attention 2**
> Le chemin vers les fichiers de configuration doit être relatif par rapport au `root` de votre projet.
> Le root est lui aussi configuré dans le fichier `akg.json`.
