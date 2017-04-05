# clea generate module [name]

> **Disclaimer**
>
> The new module isn't added to the closest parent module.
>
> You have to do it manually.
>
> You can also use the `--lazy-load` option to make it lazy-loadable on the **/[name]** route.

## Options

`--with-component` generate a component with the generated module.

`--lazy-load` lazy load the module in the closest parent routing file.

## Structure

The generated structure is as followed:

```
├── my-new-module/
│    └──  my-new-module.module.ts
```

With the **--with-component** option:

```
├── my-new-module/
│    |──  my-new-module.module.ts
│    |──  my-new-module.component.html
│    |──  my-new-module.component.scss
│    |──  my-new-module.component.spec.ts
│    |──  my-new-module.component.ts
│    └──  my-new-module.controller.ts
│
└── parent.module.ts     <-- Register the component in the closest parent module
```

With the **--lazy-load** option:

```
├── my-new-module/
│    └──  my-new-module.module.ts
│
└── parent.routing.ts     <-- Lazy loading for the newly added route
```
