var gulp = require('gulp'),
    debug = require('gulp-debug'),
    zip = require('gulp-zip'),
    clean = require('gulp-clean');

//打包
gulp.task('zip',['clean-zip'],function() {
      return gulp.src('./{dist,public}/**')
         .pipe(zip('app.zip'))
         .pipe(gulp.dest('dist'));
});

gulp.task('clean-zip', function() {
    return gulp.src('dist/*.zip', {read: false})
          .pipe(clean());
});
