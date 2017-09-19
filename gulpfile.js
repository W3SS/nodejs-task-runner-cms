const gulp 		= require("gulp"),
config 			= require("./gulp/gulp_tasks/config.json"),
requireDir  	= require("require-dir");
requireDir("gulp/gulp_tasks", {recurse: true});

var jsonList = require('./nodeRunner/data/dataList.json');

gulp.task("default", ["compileStylus"]);


