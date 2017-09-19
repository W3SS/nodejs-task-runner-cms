const rimraf = require('rimraf');
const chalk = require('chalk');

function deleteFldr(folder){
  rimraf(folder, function(){
      console.log(chalk.magenta('['+folder+']'),chalk.green(' successfully deleted'));
  });
};

module.exports = exports = function deleteFolder(dirs) {
  var fldr = dirs;
  fldr.forEach(function(folder) {
    deleteFldr(folder)
  });
};
