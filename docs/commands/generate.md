# clea generate [blueprint] [name]

> Generate a new entity

The generation is almost the same for each entity type.

> **Info**
>
> If the files already exists, they aren't overrided.

Entity                  | Usage
---                     | ---
Component               | `clea generate component my-new-component`
Directive               | `clea generate directive my-new-directive`
Filter                  | `clea generate filter my-new-filter`
Service                 | `clea generate service my-new-service`
Module                  | `clea generate module my-new-module`

## Options

```bash
clea help generate
```

## Command

```bash
clea generate [entity] my-new-entity

# Support relative path
# If you are under the src/app/feature/ folder, and launch:
clea generate [entity] my-new-entity
# Your new entity will be generated under the src/app/feature/my-new-entity folder

# But, if you are still in the src/app/feature/ folder, and launch:
clea generate [entity] ../my-newer-entity
# Your entity will be generated in the src/app/my-newer-entity folder
```

## Details

For more details on specific entity:

* [Component](generate/component.md)
* [Directive](generate/directive.md)
* [Filter](generate/filter.md)
* [Service](generate/service.md)
* [Module](generate/module.md)
