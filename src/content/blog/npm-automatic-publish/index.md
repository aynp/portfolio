---
title: "Automatically publish to NPM"
description: "Automatically generate a new release and publish your node project when the version in your package.json changes."
date: "Jan 20 2023"
---

GitHub provides a guide to [Publishing packages to the npm registry](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages#publishing-packages-to-the-npm-registry). A workflow publishes the package on GitHub and is run everytime a new release is created on GitHub.
The issue with this approach is that you have to manually create a new tag and release title with the latest version number. This behaviour might be desireable for large projects where each release goes through thorough testing, but for small projects is just manual re-entering of same version number at multiple places.

The meathod described below aims to make `package.json` as the [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth) for the version number of the package.

**Note** - If the sole aim is to publish to NPM (without creating a GitHub release) there exist solutions which control the entire process, e.g. [npm-publish](https://github.com/marketplace/actions/npm-publish).

The method described below essentially solve the same problem (and also create a new GitHub release during the process) but is made to be modular and work seamlessly with established workflows and guides provided by GitHub.

## Working

The process consists of two workflows each solving particular task -

- #### Creating a new release

  This part is handled by [aynp/node-automatic-release](https://github.com/aynp/node-automatic-release).
  For auth you will have to create a new [Personal Access Token](https://github.com/settings/tokens). Although GitHub creates a new `GITHUB_TOKEN` for every workflow run, but in order to trigger a workflow from another workflow (Publish after Creating a Release in our case) we need to use a Personal Access Token. You can read more about it [here](https://docs.github.com/en/actions/using-workflows/triggering-a-workflow#triggering-a-workflow-from-a-workflow).

- #### Publishing to NPM
  Once we setup a workflow to automatically create a release, creating a new workflow to automatically publish it to NPM has been made fairly trivial by GitHub.
  You can refer to the above mentioned guide on [Publishing packages to the npm registry](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages#publishing-packages-to-the-npm-registry).
  GitHub also provides a [ `Publish Node.js Package` workflow template](https://github.com/actions/starter-workflows/blob/main/ci/npm-publish.yml) which can be easily found on the `New workflow` page under Actions.

## Examples

For an example of repository using the above method you can have a look at the following repositories

- [aynp/github-to-json](https://github.com/aynp/github-to-json).
-

## Sample structure

```txt
/
└─ .github
	└─ workflows
		├─ create-release.yml
		└─ publish-to-npm.yml
```

```yml
# create-release.yml
name: Automatic Release

on:
  # When a change is pushed to package.json in main branch
  push:
    branches: ['main']
    paths: ['package.json']
  # Manual run
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Required to access package.json
      - name: Checkout
        uses: actions/checkout@v3

      - name: Update Release
        uses: aynp/node-automatic-release@v1.1.0
        with:
	      token: ${{secrets.PAT}}
          draft_release: false
          generate_release_notes: true
```

```yml
name: Node.js Package

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm ci
      - run: npm test

  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          registry-url: https://registry.npmjs.org/
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
```
