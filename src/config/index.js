module.exports = {
  TITLE: 'snabb',
  DESCRIPTION: 'Barebone application renderd server-side, react, react-router, CSS-modules.',

  MOUNTING_POINT: 'app',

  files: {
    STYLE_BUNDLE: 'main.css',
    CLIENT_BUNDLE: 'bundle.js'
  },

  entry: {
    production: './build/client',
    development: './src/client'
  }
};
