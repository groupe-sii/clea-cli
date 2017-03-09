# akg new|init [type] [name]

Génère une application ou une librairie AngularJS.

## akg new [type] [name]

Créé un dossier `name` et lance la commande `akg init` à l'intérieur.

### Options

```bash
akg help new
```

## akg init [type] [name]

Génère un projet AngularJS.

Permet de générer un squelette d'application ou de librairie.

### Usage

```bash
akg help init
```

### Application

```bash
akg new application APPLICATION_NAME
akg new app APPLICATION_NAME # En utilisant l'alias

cd APPLICATION_NAME
akg serve
```

Rendez-vous sur http://localhost:8080/. L'application va automatiquement se recharger si vous changez l'un des fichiers source.

### Librairie

```bash
akg new library LIBRARY_NAME
akg new lib LIBRARY_NAME # En utilisant l'alias

cd LIBRARY_NAME
```
