const fs = require('fs'),
	path = require('path'),
	util = require('util'),
	rimraf = require('rimraf');
var now, testRun;

function isOlder(path, ageSeconds) {
	var stats = fs.statSync(path),
		mtime = stats.mtime.getTime(),
		expirationTime = (mtime + (ageSeconds * 1000));
	return now > expirationTime;
}

function hasMaxLevel(options) {
	return options && options.hasOwnProperty('maxLevel');
}

function getMaxLevel(options) {
	return hasMaxLevel(options) ? options.maxLevel : -1;
}

function doDeleteFile(currentFile, options) {
	// by default it deletes nothing
	var doDelete = false;
	var extensions = (options && options.extensions) ? options.extensions : null;
	var files = (options && options.files) ? options.files : null;
	var dir = (options && options.dir) ? options.dir : null;
	var ignore = (options && options.ignore) ? options.ignore : null;
	// return the last portion of a path, the filename aka basename
	var basename = path.basename(currentFile);
	if(files) {
		if(util.isArray(files)) doDelete = (files.indexOf("*.*") !== -1) || (files.indexOf(basename) !== -1);
		else {
			if(files === '*.*') {
				doDelete = true;
			} else {
				doDelete = (basename === files);
			}
		}
	}
	if(!doDelete && extensions) {
		var currentExt = path.extname(currentFile);
		if(util.isArray(extensions)) {
			doDelete = extensions.indexOf(currentExt) !== -1;
		} else {
			doDelete = (currentExt === extensions);
		}
	}
	if(doDelete && ignore) {
		if(util.isArray(ignore)) doDelete = !(ignore.indexOf(basename) !== -1);
		else doDelete = !(basename === ignore);
	}
	return doDelete;
}

function isTestRun(options) {
	return(options && options.hasOwnProperty('test')) ? options.test : false;
}

var removeFile = module.exports = function(currentDir, options, currentLevel) {
	var removed = {};
	if(fs.existsSync(currentDir)) {
		var maxLevel = getMaxLevel(options),
			deleteDirectory = false;
		if(currentLevel === undefined) currentLevel = 0;
		else currentLevel++;
		if(currentLevel < 1) {
			now = new Date().getTime();
			testRun = isTestRun(options);
		}
		if(maxLevel === -1 || currentLevel < maxLevel) {
			var filesInDir = fs.readdirSync(currentDir);
			filesInDir.forEach(function(file) {
				var currentFile = path.join(currentDir, file);
					if(doDeleteFile(currentFile, options)) {
						if(!testRun) fs.unlinkSync(currentFile);
						removed[currentFile] = true;
					}
			});
		}
		if(deleteDirectory) {
			try {
				if(!testRun) rimraf.sync(currentDir);
				removed[currentDir] = true;
			} catch(err) {
				throw err;
			}
		}
	}
	return removed;
};
