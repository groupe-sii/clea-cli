# Make it Progressive

> Clea allows you to generate an application with default Progressive Web App support.

## Usage

```bash
clea new <app-name> --make-it-progressive
```

## Structure

These file are generated or modified by the Progressive Web App support option:

- **src/public/index.html**: add <head> metadata for PWA support and Service Worker registration.
- **src/public/manifest.json**: manifest file describing the application.
- **src/public/assets/launcher/**: some default launcher icons.
