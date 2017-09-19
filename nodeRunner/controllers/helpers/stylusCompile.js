const cmdHelper = require('./cmdHelper');

module.exports = exports = function stylusCompile(file){
  cmdHelper('stylus --compress ./nodeRunner/development/stylus/' + file + '.styl  --out ./nodeRunner/public/css/' + file + '.min.css')
};
