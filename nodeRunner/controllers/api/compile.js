const cssMin = require('../helpers/cssMin'),
jsMin = require('../helpers/jsMin'),
stylusCompile = require('../helpers/stylusCompile'),
scssCompile = require('../helpers/scssCompile'),
sassCompile = require('../helpers/sassCompile'),
lessCompile = require('../helpers/lessCompile');


exports.compileStylus = (req, res) => {
  stylusCompile('styles');
  stylusCompile('dark');
};

exports.compileScss = (req, res) => {
  scssCompile('styles');
  scssCompile('dark');
};

exports.compileSass = (req, res) => {
  sassCompile('styles');
  sassCompile('dark');
};

exports.compileLess = (req, res) => {
  lessCompile('styles');
  lessCompile('dark');
};

exports.compileCSS = (req, res) => {
  cssMin('styles');
  cssMin('dark');
};

exports.compressJs = (req, res) => {
  jsMin('app');
};
