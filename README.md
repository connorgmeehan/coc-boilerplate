# Code On Canvas Extendible Boilerplate

This repo includes everything you need to build a static website, deploy it to AWS, and extend it with other AWS services.

## Getting started

TODO: Add getting started steps

## Commands

- `yarn dev` to run a dev server
- `yarn build` to build the project
- `yarn deploy` to build and deploy the project (to a staging environment)
- `yarn remove` Removes the staging environment 

### TODO:
- `yarn release` to build and deploy the project (to the production environment) (TODO)
- `yarn remove:prod` Removes the production environment

## Overview
There are a few subfolders within this repo, some are project starters and others a examples of libs or config.  There's no harm in leaving libs in the project but you should delete any apps/project starters that you're not using.

### Apps / Project starters
- `app/` Simple single page vue app.
- `site/` A more complex, multi-page vue application, with server side rendering etc.
- `infrastructure/` A serverless project, enhanced with [lift](https://github.com/getlift/lift) to deploy the site to AWS.
  - Note: This is configured to deploy the `app/` but not the `site/` project.  If you want to deploy `site/` instead you should:
    1. Update `infrastructure/package.json` to reference `@coc-boilerplate/site` instead of `@coc-boilerplate/app`
    2. Update `infrastructure/serverless.yml` `constructs: -> landing-page: -> path:` to read `../site/dist` instead of `../app/dist`

### Other folders
- `shared/` An example of a shared lib that can be used in multiple apps/project starters

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

More config options in the [get lift repository](https://github.com/getlift/lift#constructs).

### Adding a domain / URL

You can register the domain on route53 or use any other domain registration provider.

First we need a valid https certificate.  This is assigned via the certificate ARN in `infrastructure/serverless.yml`

```yml
constructs:
  landing:
      # ...
      domain: mywebsite.com
      # ARN of an ACM certificate for the domain, registered in us-east-1
      certificate: arn:aws:acm:us-east-1:123456615250:certificate/0a28e63d-d3a9-4578-9f8b-14347bfe8123
```

> [How to generate a HTTPS certificate](https://github.com/getlift/lift/blob/master/docs/static-website.md#https-certificate)

Once the config is set, run `yarn deploy` and it should output the url of the cloudfront distribution as `xxx.cloudfront.net`.  Configure your DNS to point to `xxx.cloudfront.net` using a `CNAME` entry.


