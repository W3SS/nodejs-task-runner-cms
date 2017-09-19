const fs = require('fs');
const count = require('../count.js');
const modJSON = require('../modJSON');
const chalk = require('chalk');

module.exports = exports = function countStat(dir, obj){
  count(dir, function (err, results) {
    var size = parseInt(Math.round(results.bytes/1024));
    modJSON.path('./nodeRunner/config/data.json')
    .modify(obj + 'Size', size)
    .modify(obj + 'Files', results.files)
    .modify(obj +'Dirs', results.dirs);
    console.log('Project info updated')
    console.log(results)
   // { files: 10, dirs: 2, bytes: 234 }
  })

}
