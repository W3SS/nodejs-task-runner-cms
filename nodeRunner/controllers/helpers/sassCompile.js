const cmdHelper = require('./cmdHelper');

module.exports = exports = function sassCompile(file){
  cmdHelper('sass --sourcemap=none --style  compressed ./nodeRunner/development/sass/' + file + '.sass  ./nodeRunner/public/css/' + file + '.min.css')
};
