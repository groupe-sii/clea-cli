# akg lint

> lance l'analyse statique du code

## Options

```bash
akg help lint
```

`--fix` essaie de corriger les erreurs.

`--force` retourne un code d'erreur 0 et lance tous les analyseurs de code en cas d'erreurs.

## TypeScript

Se base sur le fichier `tslint.json`. Si celui-ci n'est pas présent, la tache TypeScript sera ignorée avec un warning.

## SASS

Se base sur le fichier `.sass-lint.yml`. Si celui-ci n'est pas présent, la tache SASS sera ignorée avec un warning.
