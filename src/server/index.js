const nodeStylusRequire = require('node-stylus-css-modules-require');
const prependStyleLoader = require('prepend-style-loader');

// Allow node to import stlyus files and prepend mixin/variables files automatically.
// The prepender is not required if your're not going to use the genereated stlyes.
nodeStylusRequire('[name]__[local]___[hash:base64:5]')(
  function(fileContent) {
    return prependStyleLoader.apply({
      query: 'prepend=[src/resources/global/variables, src/resources/global/mixins]',
      cacheable: function() {}
    }, [fileContent]);
  }
)(/* post-transformer */);

const startServer = require('./server').default;

// Initiate server.
startServer(process.env.PORT || 3000);
