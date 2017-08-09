var gulp = require('gulp'),
    debug = require('gulp-debug'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    cached = require('gulp-cached'),
    jadeInheritance = require('gulp-jade-inheritance'),
    gulpif = require('gulp-if'),
    filter = require('gulp-filter'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    gulp_init = 0;

// 加载路径配置文件
var config = require('../gulp_config.json');

//jade 模版
gulp.task('jade', function() {
    return gulp.src(config.src.jadePath)
        .pipe(plumber())
        .pipe(changed(config.dist.viewPath, {
            extension: '.html'
        }))
        .pipe(cached('jade'))
        .pipe(gulpif(gulp_init != 0, jadeInheritance({
            basedir: 'src/jade'
        })))
        .pipe(filter(function(file) {
            //console.log(!/\/_/.test(file.path) && !/^_/.test(file.relative));
            return !/\/_/.test(file.path) && !/\_/.test(file.relative);
        }))
        .pipe(gulpif(gulp_init != 0,debug({
            title: '编译:'
        })))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulpif(gulp_init++ != 0, gulp.dest(config.dist.viewPath)))
});
//监控 jade整个执行完毕 再reload
gulp.task('jade-watch', ['jade'], reload);
