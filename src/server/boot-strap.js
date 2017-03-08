const prependStyleLoader = require('prepend-style-loader');
const urlLoader = require('url-loader');
const hook = require('css-modules-require-hook');
const debug = require('debug');
const info = debug('snabb::bootstrap');
const fs = require('fs');

const stylus = require('stylus');
const path = require('path');
const config = require('../config/src-config');

info('running');
hook({
  extensions: [ '.styl' ],
  rootDir: path.join(__dirname, '..', '..'),
  generateScopedName: config.LOCAL_INDENT_NAME,
  camelCase: true,
  preprocessCss: function(css, filename) {
    const variables = path.resolve(__dirname, '../resources/global/variables');
    const mixins = path.resolve(__dirname, '../resources/global/mixins');

    css = prependStyleLoader.apply({
      // TODO: get from config
      query: `?prepend[]=${variables}&prepend[]=${mixins}`,
      cacheable: function() {}
    }, [ css ]);

    return stylus(css)
      .set('filename', filename)
      .render();
  }
});

// "Ignore" .css files on server side.
require.extensions['.css'] = function(module, filename) {
  module._compile('module.exports = undefined', filename);
};
// Loads svgs on server-side
require.extensions['.svg'] = function(module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const svg = urlLoader.call({
    resourcePath: filename,
    query: '?limit=0'
  }, new Buffer(content));

  try {
    module._compile(svg, filename);
  } catch (e) {
    console.error(e);
  }
};

info('done');
