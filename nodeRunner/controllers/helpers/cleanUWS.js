const os = require('os');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const modJSON = require('../modJSON');
const urls = require('../../urls/urls');

function deleteFiles(files, callback){
  var i = files.length;
  files.forEach(function(filepath){
    fs.unlink(filepath, function(err) {
      i--;
      if (err) {
        callback(err);
        return;
      } else if (i <= 0) {
        callback(null);
      }
    });
  });
}

//remove OS non usable parts of this module (saves win users > 7.5mb, saves linux users > 2.7mb)
module.exports = exports = function cleanUWS() {

  //get platform type
  if (os.platform() === "linux") {

     let files =  [
        './node_modules/term-size/vendor/windows/term-size.exe',
        './node_modules/term-size/vendor/macos/term-size',
        './node_modules/node-notifier/vendor/terminal-notifier.app/Contents/MacOS/terminal-notifier',
        './node_modules/uws/uws_darwin_46.node',
        './node_modules/uws/uws_darwin_47.node',
        './node_modules/uws/uws_darwin_48.node',
        './node_modules/uws/uws_darwin_51.node',
        './node_modules/uws/uws_win32_48.node',
        './node_modules/uws/uws_win32_51.node',
        './node_modules/lodash/lodash.min.js',
        './node_modules/lodash/core.min.js',
        './node_modules/core-js/client/core.min.js',
        './node_modules/core-js/client/library.min.js',
        './node_modules/core-js/client/shim.min.js',
        './node_modules/socket.io-client/dist/socket.io.slim.js',
        './node_modules/core/client/shim.min.js',
        './node_modules/es6-promise/dist/es6-promise.min.js',
        './node_modules/path-parse/index.min.js',
        './node_modules/path-parse/test.min.js',
        './node_modules/ipaddr.js/ipaddr.min.js',
        './node_modules/imurmurhash/imurmurhash.min.js',
        './node_modules/source-map-support/browser-source-map-support.js'
        ];

    deleteFiles(files, function(err) {
      if (err) {
        console.log(chalk.red(err));
      } else {
        console.log(chalk.green('all files removed'));

        modJSON.path(urls.data)
            .modify('uws', 'complete');
      }
    });

  } else if (os.platform() === "win32") {

    let files = [
                  './node_modules/term-size/vendor/macos/term-size',
                  './node_modules/node-notifier/vendor/terminal-notifier.app/Contents/MacOS/terminal-notifier',
                  './node_modules/uws/uws_darwin_46.node',
                  './node_modules/uws/uws_darwin_47.node',
                  './node_modules/uws/uws_darwin_48.node',
                  './node_modules/uws/uws_darwin_51.node',
                  './node_modules/uws/uws_linux_46.node',
                  './node_modules/uws/uws_linux_47.node',
                  './node_modules/uws/uws_linux_48.node',
                  './node_modules/uws/uws_linux_51.node',
                  './node_modules/lodash/lodash.min.js',
                  './node_modules/lodash/core.min.js',
                  './node_modules/core-js/client/core.min.js',
                  './node_modules/core-js/client/library.min.js',
                  './node_modules/core-js/client/shim.min.js',
                  './node_modules/socket.io-client/dist/socket.io.slim.js',
                  './node_modules/core/client/shim.min.js',
                  './node_modules/path-parse/index.min.js',
                  './node_modules/path-parse/test.min.js',
                  './node_modules/ipaddr.js/ipaddr.min.js',
                  './node_modules/imurmurhash/imurmurhash.min.js',
                  './node_modules/source-map-support/browser-source-map-support.js',
                  './node_modules/nodemon/travis_after_all.py',
                  './node_modules/.bin/babylon',
                  './node_modules/.bin/gulp',
                  './node_modules/.bin/he',
                  './node_modules/.bin/html-minifier',
                  './node_modules/.bin/jsesc',
                  './node_modules/.bin/json5',
                  './node_modules/.bin/loose-envify',
                  './node_modules/.bin/mime',
                  './node_modules/.bin/mkdirp',
                  './node_modules/.bin/modclean',
                  './node_modules/.bin/nodetouch',
                  './node_modules/.bin/nopt',
                  './node_modules/.bin/nunjucks-precompile',
                  './node_modules/.bin/rimraf',
                  './node_modules/.bin/rc',
                  './node_modules/.bin/semver',
                  './node_modules/.bin/strip-bom',
                  './node_modules/.bin/uglifyjs',
                  './node_modules/.bin/user-home',
                  './node_modules/.bin/which',
                  './node_modules/.bin/window-size',
                  './node_modules/registry-auth-token/yarn.lock',
                  './node_modules/html-minifier/cli.js',
                  './node_modules/html-minifier/sample-cli-config-file.conf.js',
                  './node_modules/engine.io-client/engine.io.js',
                  './node_modules/**/*.txt'

               ];

    deleteFiles(files, function(err) {
      if (err) {
        console.log(chalk.red(err));
      } else {
        console.log(chalk.green('all files removed'));

        modJSON.path(urls.data)
            .modify('uws', 'complete');
      }
    });
  } else {
   console.log(chalk.magenta('os type currently unsupported for this action'));
  }

};
