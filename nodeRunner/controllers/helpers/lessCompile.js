const cmdHelper = require('./cmdHelper');

module.exports = exports = function lessCompile(file){
  cmdHelper('lessc --clean-css ./nodeRunner/development/less/' + file + '.less  ./nodeRunner/public/css/' + file + '.min.css')
};
