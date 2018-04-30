var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge2 = require('merge2');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var addModuleExports = require('./gulp-addModuleExports');
var tsProject = ts.createProject('./tsconfig.json');
var config = require('./tsconfig.json');
var DEST = '../dist/';

gulp.task('packaging', function() {
  var filesResult = gulp.src(config.files);
  var srcResult = gulp.src('../src/**/*.ts');
  var mergeResult = merge2(filesResult, srcResult);
  var tsResult = mergeResult
      .pipe(sourcemaps.init())
      .pipe(tsProject());
  return (tsResult.js
      .pipe(
        babel({
          presets: ['es2015']
        })
      )
      .pipe(addModuleExports('Vejay'))
      // 输出js
      .pipe(gulp.dest(DEST))
      // 输出压缩过的.min.js
      .pipe(uglify()).pipe(rename({ extname: '.min.js' })).pipe(gulp.dest(DEST))
  );
});

gulp.task('map', function() {
    var filesResult = gulp.src(config.files);
    var srcResult = gulp.src('../src/**/*.ts');
    var mergeResult = merge2(filesResult, srcResult);
    var tsResult = mergeResult
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return (tsResult
        .pipe(sourcemaps.write('.'))
        // 输出js
        .pipe(gulp.dest(DEST))
    );
});

