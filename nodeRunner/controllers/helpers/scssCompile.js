const cmdHelper = require('./cmdHelper');

module.exports = exports = function scssCompile(file){
  cmdHelper('scss --sourcemap=none --style  compressed ./nodeRunner/development/scss/' + file + '.scss  ./nodeRunner/public/css/' + file + '.min.css')
};
