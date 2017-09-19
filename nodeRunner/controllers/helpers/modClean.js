const path = require('path');
const fs = require('fs');
const ModClean = require('modclean').ModClean;
const chalk = require('chalk');

module.exports = exports = function modCleanTask(pathTo,pattern,test) {


  let mc = new ModClean({
      cwd: path.join(process.cwd(), pathTo),
      patterns: ["default:" + pattern]
    //  ,test: test
  });

  mc.on('deleted', function(file) {
      // For every file deleted, log it
      console.log((chalk.grey(mc.options.test? 'TEST' : '')), chalk.cyan(file), chalk.green('deleted from filesystem'));
      console.log(JSON.stringify(file, "deleted from filesystem"));
  });

  mc.on('complete', function(err, files) {
    // create statistics

  });

  // Run the cleanup process without using the 'clean' function
  mc._find(function(err, files) {
      if(err) return console.error(chalk.red('Error while searching for files'), err);

      mc._process(files, function(err, results) {

          if(err) return console.error(chalk.red('Error while processing files'), err);

          console.log(chalk.green('Deleted Files Total:', results.length));
          if (mc.errors.length === 0) {
            console.log(chalk.green(`${mc.errors.length} total errors occurred`));
          } else {
            console.log(chalk.red(`${mc.errors.length} total errors occurred`));
          }
          console.log(chalk.grey('[info]'),chalk.green('results logged to:'),chalk.cyan('./nodeRunner/logs/modclean.json'));

          fs.writeFile('./nodeRunner/logs/modclean.json', JSON.stringify(files), 'utf8'),
              function(err) {
                  if (err) throw err;
              };
      });
  });
};
