# snabb
[![codecov](https://codecov.io/gh/kodjevlar/snabb/branch/master/graph/badge.svg)](https://codecov.io/gh/kodjevlar/snabb)
[![travic-ci](https://api.travis-ci.org/kodjevlar/snabb.svg?branch=master)](https://travis-ci.org/kodjevlar/snabb)

>A bare bone project which uses some of the latest technologies to date. It’s purpose is to allow new ideas to quickly become MVPs. It provides an efficient and stable starting point which also is capable of growing into a more complex service.

TL;DR Barebone SPA project using react and server-side rendering with react-dom-stream.

## Project structure
```
.
├── src
|   ├── client
|   ├── sub-components (presentational)
|   |   ├── navigation (component structure)
|   |   |   ├── components (Sub-components which are only used by the enclosing component)
|   |   |   ├── styles
|   |   |   ├── tests
|   |   |   ├── navigation.js
|   |   |   └── index.js
|   |   ├── common (Generally used components)
|   |   └── ...
|   ├── containers
|   ├── config (application settings)
|   ├── routes (application routes)
|   ├── server
|   |   ├── generate-markup.js  (Template shell for the server-side SPA)
|   |   ├── hmr-setup.js
|   |   ├── server-route.js (Catch all route for react-router match)
|   |   ├── server.js
|   |   └── style-import-hook.js  (Require extension for stylus)
|   ├── redux
|   |   └── ducks (a duck = reducer + action types + action creators)
|   ├── actors
|   ├── utils
|   └── services
└── build (transpiled files)
```

## Core technologies
- Babel
- CSS-modules
- Express
- Post-css
- React
- Redux
- React-dom-stream
- Stylus
- Webpack
- Mocha
- Chai

## Usage
### Install dependencies

```bash
git clone git@github.com:kodjevlar/snabb.git
cd snabb
yarn install
```

### Start production application

```bash
npm run build:all
NODE_ENV=production npm start
```

### Development mode
Serve application in development mode using HMR.

```bash
npm run hmr
```

### Test
```bash
npm run test:watch
```

### Coverage

Generate test-coverage report using nyc.

```bash
npm run test:coverage
```
