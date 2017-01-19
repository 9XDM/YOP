var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    exec = require('child_process').exec,
    browserSync = require('browser-sync');

gulp.task('less', function() {
    console.log("less compiled");
    return gulp.src('./static/style/base.less')
        .pipe(less().on('error', function(err) {
            console.log(err);
        }))
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(gulp.dest('./static/style'));
});

gulp.task('default', ['less'], function() {
    gulp.watch('./static/style/*.less', ['less']);
});
