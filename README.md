# snabb
[![codecov](https://codecov.io/gh/kodjevlar/snabb/branch/master/graph/badge.svg)](https://codecov.io/gh/kodjevlar/snabb)
[![travic-ci](https://api.travis-ci.org/kodjevlar/snabb.svg?branch=master)](https://travis-ci.org/kodjevlar/snabb)

>A bare bone project which uses some of the latest technologies to date. It’s purpose is to allow new ideas to quickly become MVPs. It provides an efficient and stable starting point which also is capable of growing not a more complex service.

TL;DR Barebone SPA project using react and server-side rendering with react-dom-stream.

## Technologies
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
npm start
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
