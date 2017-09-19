const gulp = require("gulp");
const uglify = require("gulp-uglify");
const config = require("./config.json");

gulp.task("minModulesUgly", function () {
  gulp.src(config.ModulesUgly, {base: "./"})
    .pipe(uglify({parse: {bare_returns:true}}))
    .pipe(gulp.dest("./"));
});
