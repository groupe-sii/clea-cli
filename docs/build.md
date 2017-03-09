# akg build

> Compile l'application dans le dossier destination

## Options

```bash
akg help build
```

`--verbose` (`-V`) affiche des informations plus détaillées lors de la tache de build.

`--target [env]` sélectionne l'environnement avec lequel doit être buildé l'application. Voir [environments.md](environments.md) pour plus de détails. **development** par défaut.

`--output-path [path]` dossier de destination de build. **dist/** par défaut.

`--sourcemap` génère les sourcemaps.

`--doc` genère la documentation.

`--progress` affiche une état de la compilation.

`--merge-config [config]` merge la configuration webpack avec l'éxistante.

`--override-config [config]` remplace totalement la configuration webpack existante par celle-ci.
