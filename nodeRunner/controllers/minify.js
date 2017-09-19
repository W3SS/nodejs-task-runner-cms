/* minifies output  */
var minifyOutput, exports;

minifyOutput = require('html-minifier');

module.exports = exports = function(req, res, next) {
  res.oldRender = res.render;
  res.render = function(view, options) {
    this.oldRender(view, options, function(err, html) {
      if (err) {
        throw err;
      }
      html = minifyOutput.minify(html, {
        caseSensitive: false,
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: false,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        sortClassName: false,
        sortAttributes: false
      });
      res.send(html);
    });
  };
  next();
};
