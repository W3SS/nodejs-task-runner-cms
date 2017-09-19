const { exec } = require('child_process');
const chalk = require('chalk');

module.exports = exports = function cmdHelper(cmd) {
  exec(cmd, (err, stdout, stderr) => {
      if (err) {
          console.log(chalk.red('[cmdHelper] error'));
          console.log(chalk.red('[cmdHelper]'),chalk.cyan( stderr));
      }  else {
          console.log(chalk.green('[cmdHelper] success'));
          console.log(chalk.green('[cmdHelper]'),chalk.cyan(stdout));
      }
      return;
  });
};
