<h3 align="center">:construction: :construction: :construction: THIS PROJECT HAS AN EXPERIMENTAL STATUS, DON'T USE IT :construction: :construction: :construction:</h3>
&nbsp;

<h1 align="center">@kode-frontend/pathfinder-web-react</h1>

<div align="center">
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
</div>

<p align="center">
  <a href="#installation">Installation</a> | 
  <a href="#features">Features</a> |
  <a href="#quickstart">Quickstart</a> |
  <a href="#usage">Usage</a> |
  <a href="#commands">Commands</a> |
  <a href="#example">Example</a>
</p>
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
      resolver={openApiResolver}
      storage={storage}
      active={process.env.NODE_ENV !== 'production'}
    >
      {children}
    </Pathfinder>
  );
};
```

Import `PathfinderProvider` and render it around your whole app.

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

Run your project.

During local development (`process.env.NODE_ENV !== 'production'`) you will see a button with gears in the bottom right of the screen. When clicking it the Pathfinder UI panel appears. You need to upload your [OpenAPI 3.0 Specification](https://swagger.io/specification/), then you can configure the base paths for all requests, as well as for each one individually.

<!-- TODO: добавить скрин с панелью -->

### Local development

Local development is divided into two parts (ideally using two tabs in your terminal).

[TSDX](https://tsdx.io/) scaffolds your new library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
npm start

# or using yarn
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `/src` causes a rebuild to `/dist`.

First, run rollup to watch your `src/` module and automatically recompile it into `dist/` whenever you make changes.

```bash
npm start # runs rollup with watch flag
```

Second, run the `example/` create-react-app that's linked to the local version of your module.

```bash
# (in another tab)
cd example
npm start # runs create-react-app dev server
```

Now, anytime you make a change to your library in `src/` or to the example app's `example/src/`, create-react-app will live-reload your local dev server so you can iterate on your component in real-time.

## TODO

- [ ] replace css modules with styled components
- [ ] add storybook
- [ ] refactor components
- [ ] add usage examples

<br>

## Commands

TSDX scaffolds your new library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
npm start

# or using yarn
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run either Storybook or the example playground:

### Storybook

Run inside another terminal:

```bash
yarn storybook
```

This loads the stories from `./stories`.

> NOTE: Stories should reference the components as if using the library, similar to the example playground. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

### Example

Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

#### React Testing Library

We do not set up `react-testing-library` for you yet, we welcome contributions and documentation on this.

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## License

[MIT ©](https://github.com/appKODE/pathfinder-web-react/LICENCE)
