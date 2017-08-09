var gulp = require('gulp'),
    debug = require('gulp-debug'),
    plumber = require('gulp-plumber'),
    cached = require('gulp-cached'),
    changed = require('gulp-changed'),
    gulpif = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    img_flag = 0;

// 加载路径配置文件
var config = require('../gulp_config.json');

//图片压缩
gulp.task('imagemin', function() {
    return gulp.src(config.src.imgPath)
        .pipe(plumber())
        .pipe(changed(config.dist.imgPath))
        .pipe(cached('png,jpg,gif,svg'))
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng(),
            imagemin.svgo({
                plugins: [{
                    removeUselessDefs: false
                }, {
                    cleanupIDs: false
                }, {
                    removeViewBox: false
                }, {
                    convertPathData: false
                }, {
                    mergePaths: false
                }, {
                    removeXMLProcInst: false
                }, {
                    removeUnknownsAndDefaults: false
                }]
            })

        ], {
            verbose: true
        }))
        .pipe(gulp.dest(config.dist.imgPath));


});
