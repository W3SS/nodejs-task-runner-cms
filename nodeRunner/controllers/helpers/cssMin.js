const CleanCSS = require('clean-css'),
fs = require('fs'),
urls = require('../../urls/urls'),
chalk = require('chalk');

module.exports = exports = function cssMin(file){

  new CleanCSS().minify([urls.css + file +'.css'], function (error, output) {

      fs.writeFile(urls.css + file + '.min.css', output.styles, 'utf8'),
          function(err) {
              if (err) throw err;
          };
    console.log(chalk.cyanBright('[CSS]'),chalk.greenBright(file + '.css minified'))
    console.log(chalk.cyanBright('[results]'),chalk.greenBright(JSON.stringify(output.stats)));
  });

};
