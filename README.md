<div align="center">

### :construction: :construction: :construction: THIS PROJECT HAS AN EXPERIMENTAL STATUS, DON'T USE IT :construction: :construction: :construction:

&nbsp;

# @kode-frontend/pathfinder-web-react

  <a href="https://www.npmjs.com/package/@kode-frontend/pathfinder-web-react">
    <img alt="npm version" src="https://img.shields.io/npm/v/@kode-frontend/pathfinder-web-react.svg">
  </a>
  <a href="https://www.npmjs.com/package/@kode-frontend/pathfinder-web-react">
    <img alt="npm downloads" src="https://img.shields.io/npm/dt/@kode-frontend/pathfinder-web-react.svg">
  </a>
  <a href="https://packagephobia.com/result?p=@kode-frontend/pathfinder-web-react">
    <img alt="install size" src="https://packagephobia.com/badge?p=@kode-frontend/pathfinder-web-react">
  </a>
  <a href="https://github.com/appKODE/pathfinder-web-react/blob/main/LICENSE">
    <img alt="npm license" src="https://img.shields.io/npm/l/@kode-frontend/pathfinder-web-react.svg">
  </a>
  <a href="https://standardjs.com">
    <img alt="standard js" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
  </a>
  <a href="https://reactjs.org/">
    <img alt="react version" src="https://img.shields.io/badge/react->=16-green?style=flat&logo">
  </a>
  <br>
  <a href="#">
    <img alt="status" src="https://img.shields.io/badge/status-experimental-red?style=flat&logo">
  </a>

  <p>
    <a href="#installation">Installation</a> | 
    <a href="#features">Features</a> |
    <a href="#quickstart">Quickstart</a> |
    <a href="#usage">Usage</a> |
    <a href="#example">Example</a>
  </p>
  
</div>
&nbsp;

Pathfinder is a tool that allows to substitute the base URL for requests, helping with global error handling, testing, mocking, and more. This package provides a useful UI panel for easy HTTP requests manipulations on the client side.

## Installation

```bash
npm i @kode-frontend/pathfinder-web-react

# or using yarn
yarn add @kode-frontend/pathfinder-web-react
```

Pathfinder is intended to be paired with a storage adapter and an OpenAPI resolver, which can be fully customized or installed as npm packages.

We recommend using special libraries for integrating Pathfinder into your application. They are easy to integrate into an existing project and do not require any further development.

Save as dependencies\* :

```bash
npm i @kode-frontend/pathfinder-web-local-storage @kode-frontend/pathfinder-web-open-api

# or using yarn
yarn add @kode-frontend/pathfinder-web-local-storage @kode-frontend/pathfinder-web-open-api
```

_\*You can read more about [pathfinder-web-local-storage](https://www.npmjs.com/package/@kode-frontend/pathfinder-web-local-storage) and [pathfinder-web-open-api](https://www.npmjs.com/package/@kode-frontend/pathfinder-web-open-api) on their pages._

## Introduction

There are cases in which it is useful to monitor or manipulate HTTP requests, instead of letting it happen as is. Pathfinder is a tool that allows to configure the base path for an API on the client side, both for all requests and for each one separately. It provides a UI panel, which enables to interactively change the requests environment in accordance with an uploaded OpenAPI config.

Pathfinder works with the [OpenAPI 3.0 Specification](https://swagger.io/specification/), which can be exported from [Stoplight](https://stoplight.io/).

### Features:

- **Request interception:**\
   intercepts requests according to the specified environment and changes base URL.
- **Feature toggle for production:**\
   allows to enable or disable a feature through the developer tools.
- **Uploading and updating data from an OpenAPI config:**\
   updates environment lists and paths on the spot by uploading an OpenAPI config.

## Quickstart

Create a new provider component with Pathfinder. Import `storage` and `openApiResolver` from the corresponding packages or create custom ones.

> **Storage** is an object that implements Pathfinder data storage\
> **Resolver** takes OpenAPI data and converts it to the PathFinder format

```jsx
import { ReactNode } from 'react';
import { Pathfinder } from '@kode-frontend/pathfinder-web-react';
import { storage } from '@kode-frontend/pathfinder-web-local-storage';
import { openApiResolver } from '@kode-frontend/pathfinder-web-open-api';

type Props = {
  children: ReactNode,
};

export const PathfinderProvider = ({ children }: Props) => {
  return (
    <Pathfinder
      storage={storage}
      resolver={openApiResolver}
      active={process.env.NODE_ENV !== 'production'}
    >
      {children}
    </Pathfinder>
  );
};
```

Import `PathfinderProvider` and render it around your whole app:

```jsx
import { PathfinderProvider } from './pathfinder';

const App = () => {
  return (
    <PathfinderProvider>
      <div>your app</div>
    </PathfinderProvider>
  );
};
```

## Usage

1. Run your project.

> During local development (`process.env.NODE_ENV !== 'production'`) you will see a button with gears in the bottom right of the screen. When clicking it the Pathfinder UI panel appears.

<!-- TODO: добавить скрин с панелью -->

2. Upload your [OpenAPI 3.0 Specification](https://swagger.io/specification/) file from [Stoplight](https://stoplight.io/).
3. Configure the base paths for all requests or only for the required ones.

## Example

Clone repository and install dependencies:

```bash
git clone https://github.com/appKODE/pathfinder-web-open-api.git

npm i

# or using yarn
yarn
```

[TSDX](https://tsdx.io/) scaffolds Pathfinder inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one tab of your terminal:

```bash
npm start

# or using yarn
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `/src` causes a rebuild to `/dist`.

Then run the example playground in another tab of your terminal:

```bash
# go to /example
cd example

# install dependencies and run create-react-app dev server
npm i && npm start

# or using yarn
yarn && yarn start
```

Now, anytime you make changes to your library in `/src` or to the example app's `/src`, `create-react-app` will live-reload your local dev server so you can iterate on your component in real-time.

## TODO

- [x] replace css modules with styled components
- [ ] add storybook
- [ ] refactor components
- [ ] add usage examples

## License

[MIT ©](https://github.com/appKODE/pathfinder-web-react/LICENCE)
