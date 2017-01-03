// npm init
// npm install gulp -g
// npm install gulp --save-dev
var gulp = require('gulp');
// npm install browserify --save-dev
var browserify = require('browserify');
// npm install vinyl-source-stream --save-dev
var source = require('vinyl-source-stream');
// npm install gulp-concat --save-dev
var concat = require('gulp-concat');
// npm install gulp-uglify --save-dev
var uglify = require('gulp-uglify');
// npm install gulp-util --save-dev
var utilities = require('gulp-util');
// npm install del --save-dev
var del = require('del');
// npm install jshint --save-dev
// npm install gulp-jshint --save-dev
var jshint = require('gulp-jshint');

var buildProduction = utilities.env.production;

gulp.task('concatInterface', function(){
  return gulp.src(['./js/*-interface.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('minifyScripts', ['jsBrowserify'], function(){
  return gulp.src('./build/js/app.js')
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'));
});

gulp.task('clean', function(){
  return del(['build', 'tmp']);
});

gulp.task('build', ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});

gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
