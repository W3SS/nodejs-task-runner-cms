const gulp = require("gulp");
const minify = require("gulp-babel-minify");
const config = require("./config.json");

gulp.task("minModulesJs", function () {
  gulp.src(["node_modules/**/*.js",
            "!node_modules/**/cli.js",
            "!node_modules/clui/lib/clui.js",
            "!node_modules/lodash/dist/*.js",
            "!node_modules/mkdirp/bin/cmd.js",
            "!node_modules/slide/lib/async-map-ordered.js",
            "!node_modules/when/scripts/browserify.js",
            "!node_modules/graceful-fs/graceful-fs.js",
            "!node_modules/fmerge/fmerge.min.js",
            "!node_modules/globule/node_modules/graceful-fs/graceful-fs.js",
			"!node_modules/globule/node_modules/**/*.js"
          ])
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest("./node_modules"));
});
