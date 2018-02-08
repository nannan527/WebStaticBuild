var gulp = require('gulp'),
  debug = require('gulp-debug'),
  plumber = require('gulp-plumber'),
  cached = require('gulp-cached'),
  gulpif = require('gulp-if'),
  filter = require('gulp-filter'),
  postcss = require('gulp-postcss'),
  px2rem = require('postcss-px2rem'),
  less = require('gulp-less'),
  sass = require('gulp-sass'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  dependents = require('gulp-dependents'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

// 加载路径配置文件
var config = require('../gulp_config.json');

//sass模版
gulp.task('sass', function() {
  var processors = [
    //px2rem({remUnit:75})
    autoprefixer({
      browsers: ['> 1%', 'IE 10']
    }),
    cssnano({
      discardComments: {
        removeAll: true
      },
      mergeLonghand: true,
      zindex: false
    })
  ];
  return gulp
    .src([config.src.sassPath])
    .pipe(
      plumber(function(error) {
        console.log(error);
        this.emit('end');
        this.destroy();
      })
    )
    .pipe(cached('scss'))
    .pipe(dependents())
    .pipe(
      filter(function(file) {
        return !/\/_/.test(file.path) && !/\_/.test(file.relative);
      })
    )
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest(config.dist.cssPath))
    .pipe(
      reload({
        stream: true
      })
    );
});
