# clea generate component [name]

> Generate a new component and register it in the closest parent module

## Structure

The generated structure is as followed:

<pre>
├── my-new-component/
│    |──  my-new-component.component.html
│    |──  my-new-component.component.scss
│    |──  my-new-component.component.spec.ts
│    |──  my-new-component.component.ts
│    └──  my-new-component.controller.ts
│
└── parent.module.ts    <-- Register the component in the closest parent module
</pre>
