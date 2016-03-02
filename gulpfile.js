'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var ts = require('gulp-typescript');

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        proxy: "http://localhost:1335",
        files: ["www/**/*.*"],
        browser: "google chrome",
        port: 7001,
    });
});

gulp.task('sass', function () {
    gulp.src('app/**/styles.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('www/'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src('app/**/*.ts') // read all of the files that are in script/lib with a .js extension
      
        .pipe(ts({
            declaration: true,
            noExternalResolve: true
        }))
        .pipe(concat('app.js')) // concatenate all of the file contents into a file titled 'all.js'
        .pipe(gulp.dest('www')); // write that file to the dist/js directory
    //.pipe(browserSync.stream());
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('app/**/*.ts', ['scripts']);
    gulp.watch('app/**/*.scss', ['sass']);
    //gulp.watch('app/**/*.js', ['scripts']);
    //gulp.watch("**/*.html").on("change", browserSync.reload);
});
