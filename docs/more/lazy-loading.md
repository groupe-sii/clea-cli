# Lazy loading

Pour faire du lazy loading avec AngularJS, c'est la librairie [ocLazyLoad](https://oclazyload.readme.io/docs) qui est utilisée.

## Example

La commande `akg generate module <name> --lazy-load` permet de générer directement un module et d'activer son lazy looading.

Le fonctionnement est le suivant. Prenons un module nommé `lazy` que l'on souhaite lazy loader, et un module parent `app`.

La structure doit être la suivante: 

<pre>
├── lazy/
│    |──  lazy.module.ts
│    └──  lazy.component.ts
│
└── app.routing.ts
</pre>

### Routing

Dans le fichier `app.routing.ts`, il faut référencer le nouveau module:

```typescript
export class AppRoutes {

  constructor ($stateProvider: ng.ui.IStateProvider) {
    'ngInject';

    $stateProvider.state('lazy', {
      url: '/lazy',
      component: 'lazy',
      resolve: {
        module: ($q, $ocLazyLoad: oc.ILazyLoad) => {
          'ngInject';

          return $q ((resolve) => {
            (<WebpackRequire> require).ensure([], () => {
              let { LazyModule } = require('./lazy/lazy.module');

              $ocLazyLoad.load({
                name : LazyModule,
                files: undefined
              });

              resolve(module);
            });
          });
        }
      }
    });

  }
}
```

Dans l'example ci-dessus, la route **/lazy** va utiliser le lazy loading et le module ne sera donc chargé qu'au moment de l'appel à cette route.

## Build

Au moment de build de votre application, un chunk doit être créé pour ce module:

```bash
$ akg build

Hash: 7efaa782e1e4c0463032
Time: 13270ms
chunk    {0} main.a10ee02ef5f81e30f2e1.bundle.js, main.7efaa782e1e4c0463032.bundle.css (main) 6.29 kB {2} [rendered]
chunk    {1} 1.1825eb1e15d831e143e6.chunk.js 2.25 kB {0} [rendered] # <== Le chunk
chunk    {2} vendor.d926d0a3d4c7bee26dbb.bundle.js, vendor.7efaa782e1e4c0463032.bundle.css (vendor) 3.31 MB [rendered]
```
