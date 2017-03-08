// @flow
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const SRC = path.join(__dirname, '../');

module.exports = {
  SRC,
  ROOT,

  /* ---App--- */
  TITLE: 'snabb',
  DESCRIPTION: 'POC',
  MOUNTING_POINT: 'app',

  /* ---Webpack--- */
  ENTRIES: {
    index: path.join(SRC, 'client'),
    feed: 'components/about',
    typography: 'components/purpose'
  },

  OUTPUT: {
    PATH: path.join(ROOT, 'public'),
    FILENAME: '[name].js'
  },

  EXTENTIONS: [ '.js', '.jsx', '.json' ],

  MODULES: [
    'node_modules',
    SRC
  ],

  PUBLIC_PATH: '/public/',
  PATH: path.join(ROOT, 'public/'),

  /* ---CSS-Modules--- */
  LOCAL_INDENT_NAME: '[name]__[local]___[hash:base64:5]',

  PREPEND_STYLES: [
    path.join(SRC, 'resources/global/variables'),
    path.join(SRC, 'resources/global/mixins')
  ]
};
