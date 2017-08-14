# Lazy loading

By default, lazy-loading is activated with [ocLazyLoad](https://oclazyload.readme.io/docs) library.

## Example

To help you with the integration process, we made the following option:

```bash
clea generate module lazy --lazy-load
```

It will generate a new module called **lazy** and lazy-load it in the closest routing file.

With the above example, the following structure will be generated:

```
├── lazy/
│    |──  lazy.module.ts
│    └──  lazy.component.ts
│
└── app.routing.ts
```

In `app.route.ts`, the new module will be automatically referenced:

```typescript
export class AppRoutes {

  constructor ($stateProvider: ng.ui.IStateProvider) {
    'ngInject';

    $stateProvider.state('lazy', {
      url: '/lazy',
      component: 'lazy',
      resolve: {
        module: ['$q', '$ocLazyLoad', ($q: ng.IQService, $ocLazyLoad: oc.ILazyLoad) => {
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
        }]
      }
    });

  }
}
```

And that's it, you can now acces the **/lazy** URL which will lazy-load the new **LazyModule**.

## Build

At build time, you should see a new chunk for each lazy-loaded module:

```bash
$ clea build

Hash: 7efaa782e1e4c0463032
Time: 10483ms
chunk    {0} main.a10ee02ef5f81e30f2e1.bundle.js, main.7efaa782e1e4c0463032.bundle.css (main) 6.29 kB {2} [rendered]
chunk    {1} 1.1825eb1e15d831e143e6.chunk.js 2.25 kB {0} [rendered] # <== The new chunk
chunk    {2} vendor.d926d0a3d4c7bee26dbb.bundle.js, vendor.7efaa782e1e4c0463032.bundle.css (vendor) 2.1 MB [rendered]
```
