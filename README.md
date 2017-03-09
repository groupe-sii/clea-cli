# Générateur Typescript

CLI pour générer des applications ou librairies pour le framework AngularJS.

## Table of Contents

* [Usage](#usage)
* [Générer un projet](#generer-un-projet)
* [Générer des Composants, Filtres, Service, ...](#generer-des-composants-filtres-services-etc)
* [Plus d'informations](#plus-d-informations)

## Usage

```bash
akg help
```

## Générer un projet

### Application

```bash
akg new application APPLICATION_NAME
cd APPLICATION_NAME
akg serve
```

Rendez-vous sur http://localhost:8080/. L'application va automatiquement se recharger si vous changez l'un des fichiers source.

### Librairie

```bash
akg new library LIBRARY_NAME
cd LIBRARY_NAME
akg build
```

[Plus de détails](docs/new.md)

## Générer des Composants, Filtres, Services, etc

Vous pouvez utiliser la commande `akg generate` pour générer des composants AngularJS:

```bash
akg generate component my-new-component
```

Toutes les possibilités sont décrites dans le tableau ci-dessous:

Générer                 | Usage
---                     | ---
Component               | `akg generate component my-new-component`
Directive               | `akg generate directive my-new-directive`
Filter                  | `akg generate filter my-new-filter`
Service                 | `akg generate service my-new-service`
Module                  | `akg generate module my-new-module`
Route                   | `akg generate route my-new-route`

[Plus de détails](docs/generate.md)

## Plus d'informations

Pour plus d'informations sur les différentes commandes et ce qu'elles proposes, rendez-vous dans le dossier `docs/`.
