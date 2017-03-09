# akg generate module [name]

> Création d'un nouveau module

> **Attention**
> Le nouveau module n'est pas ajouté au module parent le plus proche.
> C'est à vous d'aller le déclarer où bon vous semble.

## Options

`--with-component` génère directement un composant pour le nouveau module.

`--lazy-load` lazy load le module dans le fichier de routing du module parent.

## Structure

La structure générée est la suivante:

<pre>
├── my-new-module/
│    └──  my-new-module.module.ts
</pre>

Avec l'option **--with-component**:

<pre>
├── my-new-module/
│    |──  my-new-module.module.ts
│    |──  my-new-module.component.html
│    |──  my-new-module.component.scss
│    |──  my-new-module.component.spec.ts
│    |──  my-new-module.component.ts
│    └──  my-new-module.controller.ts
│
└── parent.module.ts     <-- Déclare le composant dans le module parent
</pre>

Avec l'option **--lazy-load**:

<pre>
├── my-new-module/
│    └──  my-new-module.module.ts
│
└── parent.routing.ts     <-- Lazy loading pour la nouvelle route
</pre>
