module.exports = {
  TITLE: 'snabb',
  DESCRIPTION: 'Barebone application renderd server-side, react, react-router, CSS-modules.',

  MOUNTING_POINT: 'app',

  FILES: {
    STYLE_BUNDLE: 'main.css',
    CLIENT_BUNDLE: 'bundle.js',
    PUBLIC_PATH: '/public/'
  },

  ENTRY: {
    PRODUCTION: './build/client',
    DEVELOPMENT: './src/client'
  }
};
