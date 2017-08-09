var gulp = require('gulp'),
    debug = require('gulp-debug'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed');

// 加载路径配置文件
var config = require('../gulp_config.json');

gulp.task('js', function(){
       gulp.src([config.src.jsPath,'!src/content/js/**/vendor'])
        .pipe(plumber())
        .pipe(changed(config.dist.jsPath))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(config.dist.jsPath));

       gulp.src(config.src.jsvendorPath)
        .pipe(plumber())
        .pipe(changed(config.dist.jsvendorPath))
        .pipe(gulp.dest(config.dist.jsvendorPath));
});
