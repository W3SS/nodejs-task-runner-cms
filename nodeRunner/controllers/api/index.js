//API
const path = require('path'),
os = require('os'),
debug = require('debug'),
urls = require('../../urls/urls'),
fs = require('fs'),
zlib = require('zlib'),
tar = require('tar-fs'),
gzip = zlib.createGzip(),
glob = require("glob"),
backupConf = require('../backupConf'),
initLogs = require('../initLogs'),
modJSON = require('../modJSON'),
removeFile = require('../removeFile'),
del = require('del'),
deleteFolder = require('../removeFolder'),
mergeJSON = require('../mergeJSON'),
logJSON = require('../logJSON'),
chalk = require('chalk'),
data = require('../../config/data'),
{ exec } = require('child_process'),
execConf = require('../../config/exec'),
logger = require('../../logs/log.json'),
count = require('../count.js'),
countStat = require('../helpers/countStat'),
statistics = require('../../logs/statistics'),
arrayFilter = require('../arrayFilter'),
dataFiles = urls.dataDir + 'groups/',
dataList = require('../../data/dataList'),
taskNumbers = require('../../data/taskNumbers'),
modCleanTask = require('../helpers/modClean'),
cleanUWS = require('../helpers/cleanUWS'),
cmdHelper = require('../helpers/cmdHelper'),
deleteConf = require('../../config/deleteConf.json'),
dialogue = require('../../config/dialogue'),
pkg = require('../../logs/pkg');

if (data.uws !== "complete") {
  cleanUWS();
}
//traversing fs
if (data.traverse === "on") {
    var projectDir = data.project + " && ";
    var traverse = data.traverseCMD + ' && cd ' + projectDir;
} else {
    var traverse = "";
}


//add templated files to project
exports.createTpl = (req, res) => {
  var direct = process.cwd().replace(data.folder,data.project);
  var title = req.body.title;

  console.log(answer)
  if (os.platform() === "win32") {
  cmdHelper('copy ' + process.cwd() + '\\' + data.folder +'\\data\\templates\\' + title + ' ' + direct +'\\' + title);
  } else {

  }
};

exports.newTpl = (req, res) => {
  var Result = req.body.Result; //get task command from body
  modJSON.path(urls.data)
      .add('templates', Result);

      fs.writeFile(urls.dataDir + 'templates/' + Result, dialogue.dummy, 'utf8'),
          function(err) {
              if (err) throw err;
          };

  res.redirect(data.wait);
};

// delete project
exports.deleteTpl = (req, res) => {

    var toDelete = req.body.toDelete; //get task command from body
    var filterRes = arrayFilter(toDelete);
    // Execute filtering.
    var selected = data.templates.filter(filterRes);

    if (data.backups === "on") {
      backupConf();
    }
    //modify the existing array
    modJSON.path(urls.data)
        .modify('templates', selected);

    //delete the config file associated with the group
    fs.unlink(urls.dataDir + 'templates/' + toDelete, (err) => {
        if (err) throw err;
    });

    res.redirect(data.wait);

};



exports.buildNmList = (req, res) => {

  glob("./node_modules/**/*package.json", function (err, files) {
    if (err) {
        console.log(chalk.red(err));
        throw err;
    } else {
      setTimeout(function(){
          fs.writeFile(urls.pkgJson, JSON.stringify(files), 'utf8');

          modJSON.path(urls.buildLog)
              .modify('pkgNum', files.length);

          console.log(chalk.green(files.length));
      }, 8000);
    }
  });
  res.redirect(data.wait);
};

exports.editNmList = (req, res) => {
//remove wasted space via all pkg.json files in node_modules unused files/folders
  pkg.forEach(function(files) {
    modJSON.path(files)
      .del('_args')
      .del('_from')
      .del('_id')
      .del('_inCache')
      .del('_location')
      .del('_npmUser')
      .del('_npmVersion')
      .del('_phantomChildren')
      .del('_requested')
      .del('_requiredBy')
      .del('_resolved')
      .del('_shasum')
      .del('_shrinkwrap')
      .del('_spec')
      .del('_where')
      .del('_nodeVersion')
      .del('_npmOperationalInternal')
      .del('license')
      .del('licenses')
      .del('readme')
      .del('gitHead')
      .del('description')
      .del('maintainers')
      .del('devDependencies')
      .del('keywords')
      .del('homepage')
      .del('author')
      .del('bugs')
      .del('contributors')
      .del('directories');
  });
res.redirect('/tools');
};

exports.bakNm = (req, res) => {
  tar.pack('./node_modules').pipe(fs.createWriteStream(urls.backup + 'node_modules/node_modules.tar'));
  res.redirect(data.wait);
};

exports.bakSite = (req, res) => {
  tar.pack('./').pipe(fs.createWriteStream(urls.backup + 'project/project.tar'));
  res.redirect(data.wait);
};

exports.deleteNm = (req, res) => {
  //remove wasted space via unused files/folders
  if (os.platform() === "linux") {
    removeFile('./node_modules', {maxLevel: 5, extensions: ['.cmd','.exe']});
  }

  deleteFolder(deleteConf.folders);
  del(deleteConf.extAll).then(paths => {
      console.log(chalk.magentaBright('Deleted files by extention:\n'),chalk.greenBright(paths.join('\n')));
  });

  del(deleteConf.filesAll).then(paths => {
      console.log(chalk.magentaBright('Deleted files:\n'),chalk.greenBright(paths.join('\n')));
  });
  res.redirect('/tools');
};

//remove devDependencies
exports.rmDepend = (req, res) => {

cmdHelper('npm uninstall gulp && npm uninstall gulp-babel-minify && npm uninstall gulp-jsonmin && npm uninstall require-dir && npm uninstall gulp-uglify');
console.log(chalk.greenBright('Dev Dependencies removed'));
res.redirect('/tools');
};

exports.cleanNm = (req, res) => {

  //remove os-unspecific data
  if (data.uws !== "complete") {
    cleanUWS();
  }

  modCleanTask('node_modules','safe',true);
  res.redirect('/tools');
};

exports.minNm = (req, res) => {
  console.log(chalk.cyan(dialogue.compress));
  cmdHelper('gulp jsonMin && gulp minModulesUgly && gulp minModulesJs');
  res.redirect('/tools');
};

//refresh node_modules
exports.refreshNm = (req, res) => {
  countStat('./node_modules/', 'nm');
  countStat('./', 'project')
  res.redirect(data.wait);
};

//prune and dedupe
exports.prnNm = (req, res) => {
  cmdHelper('npm prune && npm ddp');
  res.redirect(data.wait);
};

//update task
exports.update = (req, res) => {
    var update = req.body.Result;

    fs.writeFile(urls.dataDir + 'groups/' + data.cmd + '.json', update, 'utf8'),
        function(err) {
            if (err) throw err;
        };

    res.redirect(data.wait);
};

// create new task
exports.modTask = (req, res) => {

    var modTask = req.body.modTask; //get task command from body
    modJSON.path(urls.data)
        .modify('cmd', modTask);

    res.redirect(data.wait);
};

// change project
exports.modProject = (req, res) => {

    var modProject = req.body.modProject; //get task command from body
    modJSON.path(urls.data)
        .modify('project', modProject);

    res.redirect(data.wait);
};

// create new task-group
exports.createGroup = (req, res) => {

    var Result = req.body.Result; //get task command from body

    if (data.backups === "on") {
      backupConf();
    }
    //add to existing array
    modJSON.path(urls.data)
        .add('modeNav', Result);

    //create new config file for new item
    fs.createReadStream(urls.tpl)
        .pipe(fs.createWriteStream(urls.dataDir + 'groups/' + Result + '.json'));

    res.redirect(data.wait);

};

exports.createProject = (req, res) => {

    var Result = req.body.Result; //get task command from body

    if (data.backups === "on") {
      backupConf();
    }
    //add to existing array
    modJSON.path(urls.data)
        .add('projects', Result);

    //create new folder for group
    cmdHelper(data.traverseCMD + ' && mkdir ' + Result);

    res.redirect(data.wait);

};

// delete task-group
exports.deleteGroup = (req, res) => {

    var toDelete = req.body.toDelete; //get task command from body
    var filterRes = arrayFilter(toDelete);
    // Execute filtering.
    var selected = data.modeNav.filter(filterRes);

    if (data.backups === "on") {
      backupConf();
    }
    //modify the existing array
    modJSON.path(urls.data)
        .modify('modeNav', selected);

    //delete the config file associated with the group
    fs.unlink(urls.dataDir + 'groups/' + toDelete + '.json', (err) => {
        if (err) throw err;

    });

    res.redirect(data.wait);

};

// delete project
exports.deleteProject = (req, res) => {

    var toDelete = req.body.toDelete; //get task command from body
    var filterRes = arrayFilter(toDelete);
    // Execute filtering.
    var selected = data.projects.filter(filterRes);

    if (data.backups === "on") {
      backupConf();
    }
    //modify the existing array
    modJSON.path(urls.data)
        .modify('projects', selected);

    res.redirect(data.wait);

};

// change theme
exports.theme = (req, res) => {

    var themeOps = req.body.themeOps; //get theme choice from body
    if (data.backups === "on") {
      backupConf();
    }
    //modify the existing theme choice from json file
    modJSON.path(urls.data)
        .modify('theme', themeOps);

    res.redirect(data.wait);

};

// change server port
exports.port = (req, res) => {

    var portOps = parseInt(req.body.portOps); //get port choice from body
    if (data.backups === "on") {
      backupConf();
    }
    //modify the existing port choice from json file
    modJSON.path(urls.data)
        .modify('port', portOps);

    res.redirect('http://localhost:'+ portOps + '/');
};

// change timed task timings
exports.timedTasks = (req, res) => {

    var timingOps = parseInt(req.body.timingOps); //get port choice from body
    if (data.backups === "on") {
      backupConf();
    }
    //modify the existing port choice from json file
    modJSON.path(urls.data)
        .modify('taskTime', timingOps);

    res.redirect(data.wait);

};

// change client side cache timings
exports.cacheTiming = (req, res) => {

    var cacheTimingNum = parseInt(req.body.cacheTimingNum); //get port choice from body
    if (data.backups === "on") {
      backupConf();
    }
    //modify the existing port choice from json file
    modJSON.path(urls.data)
        .modify('cacheTiming', cacheTimingNum);

    res.redirect(data.wait);

};

// change env
exports.env = (req, res) => {

    var envOps = req.body.envOps; //get env choice from body
    if (data.backups === "on") {
      backupConf();
    }
    //modify the existing env choice from json file
    modJSON.path(urls.data)
        .modify('env', envOps);

    res.redirect(data.wait);

};

// change debugMode
exports.debugMode = (req, res) => {
  var debugModeVal = req.body.debugModeVal,
  debugModeOpt = req.body.debugModeOpt;

  modJSON.path(urls.nodemon)
      .modify('execMap[js]', debugModeVal)

  modJSON.path(urls.data)
      .modify('debugMode', debugModeOpt)

  res.redirect(data.wait);

};

// change redirect timings from /waiting
exports.waitTiming = (req, res) => {
  var waitTimingNum = parseInt(req.body.waitTimingNum);

  modJSON.path(urls.data)
      .modify('waitTime', waitTimingNum)

    if (data.backups === "on") {
      backupConf();
    }

  res.redirect(data.wait);

};

// change redirect timings from /waiting
exports.delayTiming = (req, res) => {
  var delayTimingNum = req.body.delayTimingNum;

  modJSON.path(urls.nodemon)
      .modify('delay', delayTimingNum)

    if (data.backups === "on") {
      backupConf();
    }

  res.redirect(data.wait);

};

// change options
exports.options = (req, res) => {

    var logOps = req.body.logOps, //get log choice from body
    minOps = req.body.minOps, //get minifyOutput choice from body
    toastOps = req.body.toastOps, //get toastr choice from body
    osOps = req.body.osOps, //get osStat choice from body
    logStatsOps = req.body.logStatsOps, //get logStats choice from body
    cacheOps = req.body.cacheOps, //get app cache choice from body
    devOps = req.body.devOps, //get app development choice from body
    consoleOps = req.body.consoleOps, //get app console choice from body
    backupsOps = req.body.backupsOps, //get persistant backups choice from body
    devBarOps = req.body.devBarOps, //get dev bar choice from body
    traverseOps = req.body.traverseOps, //get traversing choice from body
    socketioOps = req.body.socketioOps, //get socketio choice from body
    timedTaskOps = req.body.timedTaskOps; //get timedTask choice from body

    if (data.backups === "on") {
      backupConf();
    }
    //modify the existing choices from json file
    modJSON.path(urls.data)
        .modify('logs', logOps)
        .modify('minifyOutput', minOps)
        .modify('toastr', toastOps)
        .modify('osStat', osOps)
        .modify('logStats', logStatsOps)
        .modify('cache', cacheOps)
        .modify('development', devOps)
        .modify('console', consoleOps)
        .modify('backups', backupsOps)
        .modify('devBar', devBarOps)
        .modify('traverse', traverseOps)
        .modify('socketio', socketioOps)
        .modify('timedTask', timedTaskOps);

    res.redirect(data.wait);

};

// change fonts
exports.fonts = (req, res) => {

    var fontOps = req.body.fontOps; //get fonts choice from body
    if (data.backups === "on") {
      backupConf();
    }
    //modify the existing choices from json file
    modJSON.path(urls.data)
        .modify('font', fontOps)

    res.redirect(data.wait);

};

// change fonts
exports.compilers = (req, res) => {

    var cssOps = req.body.cssOps; //get fonts choice from body
    if (data.backups === "on") {
      backupConf();
    }
    //modify the existing choices from json file
    modJSON.path(urls.data)
        .modify('compiler', cssOps)

    res.redirect(data.wait);

};

//clear logs
exports.clearLogs = (req, res) => {

    var logs = logger;
    var stat = statistics;
    var result = mergeJSON.merge(logs, stat);

    // create statistics
    fs.writeFile(urls.stat, JSON.stringify(result), 'utf8'),
        function(err) {
            if (err) throw err;
        };
    // clear log history
    console.log(chalk.cyan(dialogue.logs));
    initLogs();
    res.redirect(data.wait);
};

//reset statistics
exports.resetLogs = (req, res) => {
    statisticsReset = '[{"level":"info","message":"statistics initiated","timestamp":"' + (new Date).toLocaleTimeString() + '"}]';
    // create statistics
    fs.writeFile(urls.stat, statisticsReset, 'utf8'),
        function(err) {
            if (err) throw err;
        };
    console.log(chalk.cyan(dialogue.stats));
    res.redirect(data.wait);
};

//backup Logs
exports.backupLogs = (req, res) => {

  var statInBak = fs.createReadStream(urls.stat);
  var statOutBak = fs.createWriteStream(urls.backup + 'stats/statistics.json.gz');

  statInBak
    .pipe(gzip)
    .pipe(statOutBak);

    console.log(chalk.cyan(dialogue.backup));
    res.redirect(data.wait);
};

//backup Task group
exports.backupTaskGroup = (req, res) => {

  var toBackup = req.body.toBackup; //get log choice from body

  var taskInBak = fs.createReadStream(urls.dataDir + 'groups/' + toBackup + '.json');
  var taskOutBak = fs.createWriteStream(urls.backup + 'taskgroup/' + toBackup + '.json.gz');

  taskInBak
    .pipe(gzip)
    .pipe(taskOutBak);

    console.log(chalk.cyan(dialogue.backup));
    res.redirect(data.wait);
};

//reset statistics
exports.customCMD = (req, res) => {

  var consoleCMD = req.body.consoleCMD;

  exec(traverse + consoleCMD, (err, stdout, stderr) => {
      if (err) {
          console.log(chalk.red(`[CustomCMD]: ${stderr}`));
      } else {
        console.log(traverse + consoleCMD)
          console.log(chalk.magenta(`[CustomCMD]`),chalk.green(`[Success]`),chalk.yellow(`${consoleCMD}: ${stdout}`));
      }
      return;
  });

    res.redirect('/');
};

//buildtasks
exports.buildTask = (req, res) => {

    // post buildtask
    var buildTask = req.body.buildTask; //get task command from body
    var timestamp = "[" + chalk.grey((new Date).toLocaleTimeString()) + "]"; //build timestamp

function consoleSuccess() {
  console.log(chalk.green(`stdout : ${stdout}`));
}

function consoleFail() {
  console.log(chalk.red(`stderr: ${stderr}`));
}
    //console + log success
    function Success() {
        console.log(timestamp, chalk.magenta('[NodeJS notification]'), chalk.cyan('buildTask'), chalk.grey(':'), chalk.magenta('[' + buildTask + ']'), chalk.green('success!'));
        if (data.logs === "on") {
            logJSON({
                lvl: 'success',
                logMsg: buildTask
            });
        }
    }

    //console + log fail
    function Fail() {
        console.log(timestamp, chalk.yellow('[NodeJS notification]'), chalk.cyan('buildTask'), chalk.grey(':'), chalk.magenta('[' + buildTask + ']'), chalk.red('fail!'));
        if (data.logs === "on") {
            logJSON({
                lvl: 'fail',
                logMsg: buildTask
            });
        }
    }

    //check version
    if (data.cmd === 'system') { // default used for running any task inside cms folder. full command MUST be included in buildtask
        exec(buildTask, (err, stdout, stderr) => {
            if (err) {
                consoleFail();
                Fail();
            } else {
                consoleSuccess();
                Success();
            }
            return;
        });
    } else if (data.cmd === 'default') { // default used for running any task. full command MUST be included in buildtask
        exec(buildTask, (err, stdout, stderr) => {
            if (err) {
                consoleFail();
                Fail();
            } else {
                consoleSuccess();
                Success();
            }
            return;
        });
    } else { //task cmd can be used for and creating new grunt,npm task  and so on... collections.
        exec(data.cmd + ' ' + buildTask, (err, stdout, stderr) => {
            if (err) {
                consoleFail();
                Fail();
            } else {
                consoleSuccess();
                Success();
            }
            return;
        });
    }
    if (data.development === 'on') {
      res.redirect(data.wait);
    } else {
      res.redirect('/');
    }

};
