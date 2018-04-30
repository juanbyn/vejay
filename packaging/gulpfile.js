var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge2 = require('merge2');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');

var addModuleExports = require('./gulp-addModuleExports');
var tsProject = ts.createProject('./tsconfig.json');
var config = require('./tsconfig.json');
var DEST = '../dist/';

gulp.task('packaging', function() {
  var filesResult = gulp.src(config.files)
      .pipe(sourcemaps.init());
  var srcResult = gulp.src('../src/**/*.ts')
      .pipe(sourcemaps.init());
  var mergeResult = merge2(filesResult, srcResult);
  var tsResult = mergeResult.pipe(tsProject());
  return merge(tsResult, tsResult.js)
      .pipe(
        babel({
          presets: ['es2015']
        })
      )
      .pipe(addModuleExports('Vejay'))
      .pipe(gulp.dest(DEST))
      // 输出压缩过的js
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest(DEST))
      .pipe(sourcemaps.write('.'));
});
