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

/**
 * Specify post css plugins and process the generated css.
 *
 * @method extractor
 * @param  {Function}   compileStylus function which generates the css.
 * @return {Processor}  Postcss processor specified with which plugins to run on the generated css.
 */
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

/**
 * Reads and parses the required file through the stylus compiler. In order to receive valid css.
 *
 * @method compileStylus
 * @param  {String} filename Path to the require file.
 * @return {Object} Generated css scoped module names.
 */
function compileStylus(filename) {
  const css = stylus.render(readFileSync(filename, 'utf8'), { filename });

  result = extractor(compileStylus).process(css, { from: filename });

  return result.root.tokens;
}

/**
 * This function specifies what node should do when it comes
 * accross `extention` in a file import.
 *
 * @method createStyleRequireHook
 * @param  {function} compile Handels the imported filename.
 * @param  {String}   extension Specifes what type of file `compile` should be used on.
 */
function createStyleRequireHook(compile, extension) {
  require.extensions[extension] = function(module, filename) {
    const tokens = compile(filename);

    // Expose the created style object.
    module._compile('module.exports = ' + JSON.stringify(tokens), filename);
  };
}

createStyleRequireHook(compileStylus, '.styl');
