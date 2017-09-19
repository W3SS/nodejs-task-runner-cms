const fs = require('fs'),
cmdHelper = require('./cmdHelper'),
urls = require('../../urls/urls'),
chalk = require('chalk');

module.exports = exports = function jsMin(file){
  cmdHelper('UglifyJS  ' + urls.js + file + '.js -o ' + urls.js + file + '.min.js')
  console.log(chalk.cyanBright('[JS]'),chalk.greenBright(file + '.js minified'));
};
