# akg generate [blueprint] [name]

> Ajout d'une nouvelle entité

L'ajout d'une nouvelle entité est sensiblement la même pour tous les types.

Si les fichiers existes déjà, ils ne sont pas surchargés.

Générer                 | Usage
---                     | ---
Component               | `akg generate component my-new-component`
Directive               | `akg generate directive my-new-directive`
Filter                  | `akg generate filter my-new-filter`
Service                 | `akg generate service my-new-service`
Module                  | `akg generate module my-new-module`
Route                   | `akg generate route my-new-route`

## Options

```bash
akg help generate
```

## Commande

```bash
akg generate [blueprint] my-new-entity

# La génération supporte les chemins relatifs
# Si vous êtes dans le dossier src/app/feature/ et que vous lancez
akg generate [blueprint] my-new-entity
# Votre entité va être générée dans le dossier src/app/feature/my-new-entity

# Mais si vous lancez (toujours dans le dossier src/app/feature/)
akg generate [blueprint] ../my-newer-entity
# Votre entité va être générée dans le dossier src/app/my-newer-entity
```

## Module

Pour les entités de type **component**, **directive**, **filter** et **service** la commande va rechercher le module parent le plus proche pour y ajouter la déclaration de cette nouvelle entité.

Dans la structure ci-dessus, le composant `my-new-component` est déclaré dans le module `parent.module.ts`:

```javascript
import { MyNewComponent } from './my-new-component/my-new-component.component';

module.component('my-new-component', MyNewComponent);
```

## Details

Pour des détails plus spécifiques sur les entités générées:

* [Component](component.md)
* [Directive](directive.md)
* [Filter](filter.md)
* [Service](service.md)
* [Module](module.md)
* [Route](route.md)
