<h1 align="center">snabb</h1>
<div align="center">
  <sub>TL;DR Barebone SPA project using react and server-side rendering with react-dom-stream.</sub>
</div>

<br />

<div align="center">
  <img src="https://media.giphy.com/media/xcZjA0l1r7xIY/giphy.gif" alt="flash" align="center" />
</div>

<br />

<div align="center">
  <a href="https://codecov.io/gh/kodjevlar/snabb/branch/master/graph">
    <img src="https://codecov.io/gh/kodjevlar/snabb/branch/master/graph/badge.svg" alt="Dependency Status" />
  </a>
</div>

## Project structure
````
.
├── scripts
|   ├── entrypoint.sh
|   └── test-single-unit.js
├── src
|   ├── client (client-specific react-router mount/hook)
|   ├── components
|   |   ├── common
|   |   |   ├── comp-1
|   |   |   |   ├── comp-1.js
|   |   |   |   ├── comp-1.styl
|   |   |   |   ├── comp-1-spec.js
|   |   |   |   └── comp-1-container.js (opt)
|   |   |   ├── comp-2
|   |   |   |   ├── subs (sub-components)
|   |   |   |   |   ├── sub-1
|   |   |   |   |   |   ├── sub-1.styl
|   |   |   |   |   |   ├── sub-1.js
|   |   |   |   |   |   └── sub-1-spec.js
|   |   |   |   |   ├── sub-1
|   |   |   |   |   |   ├── sub-2.styl
|   |   |   |   |   |   ├── sub-2.js
|   |   |   |   |   |   └── sub-2-spec.js
|   |   |   |   ├── comp-2.js
|   |   |   |   ├── comp-2.styl
|   |   |   |   ├── comp-2-spec.js
|   |   |   |   └── comp-2-container.js (opt)
|   |   ├── route-1 (code-split by route)
|   |   |   ├── route-1.js
|   |   |   ├── route-1.styl
|   |   |   ├── route-spec-1.js
|   |   |   ├── route-1-container.js (opt)
|   |   |   └── subs (sub-components)
|   |   |   |   ├── sub-1
|   |   |   |   |   ├── sub-1.styl
|   |   |   |   |   ├── sub-1.js
|   |   |   |   |   └── sub-1-spec.js
|   |   |   |   ├── sub-2
|   |   |   |   |   ├── sub-2.styl
|   |   |   |   |   ├── sub-2.js
|   |   |   |   |   └── sub-2-spec.js
|   |   |   |   └── ...
|   |   └── route-2
|   |   |   ...
|   ├── routes (application routes)
|   ├── server
|   |   ├── redux (server-side state hook)
|   |   ├── build-page.js (Page builder for the server-side SPA, prioritizes assets based on react-router url)
|   |   ├── hmr-setup.js
|   |   ├── server-route.js (react-router matcher)
|   |   ├── server.js
|   |   └── index.js  (pre-loader, used to allow nodejs to import non-js files)
|   ├── redux
|   |   └── ducks (a duck = reducer + action types + action creators + index exporting internals)
|   |   |   └── 1-duck
|   |   |   |   ├── duck-1.js
|   |   |   |   └── duck-1-spec.js
|   |   |   └── 2-duck
|   |   |   |   ├── 2-duck.js
|   |   |   |   └── 2-duck-spec.js
|   ├── actors
|   ├── utils
|   └── services (singletons and service workers)
├── assets (public assests required to load the application, ex: bundles and sprites)
└── build
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
