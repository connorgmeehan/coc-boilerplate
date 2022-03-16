# Code On Canvas Minimal Boilerplate

This repo includes everything you need to build a static website, deploy it to AWS, and extend it with other AWS services.

## Commands

- `yarn dev` to run a dev server
- `yarn build` to build the project
- `yarn deploy` to build and deploy the project (to a staging environment)
- `yarn release` to build and deploy the project (to the production environment)

## How it works

This repository is a multi-repo powered by (turborepo)[https://turborepo.org/] to help manage dependencies.  Basically apps or libs live in subfolders in the project root.
Turborepo automatically builds and caches dependencies to reduce startup time, if a dependency changes it will rebuild the dependant applications.

### Apps

Any app with a `dev` and `build` script in its `package.json` will be considered an app.  When running `yarn dev` or `yarn build` in the monorepo root it will run these commands for the apps as well.  Alternatively you can just run `yarn dev`/`yarn build` inside of an individual project.

### Libs

You can seperate code into their own libraries that can be shared across apps.

If a package is a dependency of an **App** it will be considered a library.  There is no need to provide `build` or `dev` scripts as it will use the build system of the dependant **app** to bundle it.  To handle this, you must provide the entry point for the lib inside of its `project.json`

```json
{
  "main": "src/index.ts",
  "types": "src/index.ts",
}
```

### Adding a library as a dependency to an application

Add a lib as a dependency to an app by adding it to the `dependencies` section of the **app**'s `project.json`

```json5
{
  "dependencies": {
    "my-lib-name": "*" // Coresponds to a package at `/my-lib-name`
  }
}
```

The library will now be automatically built and cached.

## How to

### Adding a domain / URL
