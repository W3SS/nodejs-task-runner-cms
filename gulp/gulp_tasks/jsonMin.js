var gulp = require('gulp');
var jsonmin = require('gulp-jsonmin');
 
gulp.task('jsonMin', function () {
    gulp.src('./node_modules/**/*.json')
        .pipe(jsonmin())
        .pipe(gulp.dest('./node_modules'));
});