# clea new|init [name]

Create a new application (or library) with AngularJS + TypeScript.

## clea new [name]

Create a `name` folder and launch `clea init in it.

```bash
clea new APPLICATION_NAME

cd APPLICATION_NAME
clea serve
```

Go to http://localhost:8080/. Hot reload is active.

## Options

```bash
clea help new
```

`--verbose` (`-V`) verbose mode.

`--lib` generate a library instead of an application.

`--ui-framework [framework]` create application with built-in ui framework. **material** or **bootstrap** (defaults to: **none**).

`--make-it-progressive` add the default configuration for a Progressive Web App (defaults to: **false**). [Details](../more/make-it-progressive.md).

`--skip-install` skip installing packages (defaults to: **false**).

`--skip-git` skip initializing a git repository (defaults to: **false**).

`--commit-message-conventions` add commit-msg hook to force use of the [Google message conventions](../../templates/application/COMMITS-CONVENTION.md) (defaults to: **false**).

### Library

You can also scaffold a new library instead of an application.

To do so, use the `--lib` option.

```bash
clea new LIBRARY_NAME --lib
cd LIBRARY_NAME
```
