# :construction: :construction: :construction: THIS PROJECT HAS EXPERIMENTAL STATUS, DON'T USE IT :construction: :construction: :construction:

# @kode-frontend/pathfinder-web-react

[![NPM](https://img.shields.io/npm/v/@kode-frontend/pathfinder-web-react.svg)](https://www.npmjs.com/package/@kode-frontend/pathfinder-web-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @kode-frontend/pathfinder-web-react
```

or

```bash
yarn add @kode-frontend/pathfinder-web-react
```

## Usage

Local development is broken into two parts (ideally using two tabs).

First, run rollup to watch your src/ module and automatically recompile it into dist/ whenever you make changes.

```
npm start # runs rollup with watch flag
```

The second part will be running the example/ create-react-app that's linked to the local version of your module.

```
# (in another tab)
cd example
npm start # runs create-react-app dev server
```

Now, anytime you make a change to your library in src/ or to the example app's example/src, create-react-app will live-reload your local dev server so you can iterate on your component in real-time.

## TODO

- [ ] replace css modules with styled components
- [ ] add storybook
- [ ] refactor components
- [ ] add examples of usage

## License

MIT © [](https://github.com/appKODE/pathfinder-web-react/LICENCE)

> Made with create-react-library
