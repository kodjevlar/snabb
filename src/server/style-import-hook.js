import postcss from 'postcss';
import Values from 'postcss-modules-values';
import LocalByDefault from 'postcss-modules-local-by-default';
import ExtractImports from 'postcss-modules-extract-imports';
import Scope from 'postcss-modules-scope';
import Parser from 'postcss-modules-parser';
import genericNames from 'generic-names';
import stylus from 'stylus';
import { readFileSync } from 'fs';

let result;

// Process CSS
function extractor(compileStylus) {
  const generateScopedName = genericNames('[name]__[local]___[hash:base64:5]');

  const plugins = ([
    Values,
    LocalByDefault,
    ExtractImports,
    new Scope({ generateScopedName })
  ]).concat(new Parser({ compileStylus }));

  return postcss(plugins);
}

// Load CSS modules and get nodes tokens
function compileStylus(filename) {
  let css = stylus.render(readFileSync(filename, 'utf8'), { filename });

  result = extractor(compileStylus).process(css, { from: filename });

  return result.root.tokens;
}

// Require hook
function hook(compile, extension) {
  require.extensions[extension] = function(m, filename) {
    const tokens = compile(filename);

    let moduleStyles = m._compile('module.exports = ' + JSON.stringify(tokens), filename);

    return moduleStyles;
  };
}

// Run require hook
hook(compileStylus, '.styl');
