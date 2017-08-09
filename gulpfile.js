/**
 * Created by Dongyinan on 2016/6/24.
 */
var gulp = require('gulp')
    ,debug = require('gulp-debug')
    ,path = require('path')
    ,del = require('del')
    ,jade = require('gulp-jade')
    ,watch = require('gulp-watch')
    ,postcss = require('gulp-postcss')
    ,px2rem = require('postcss-px2rem')
    ,less = require('gulp-less')
    ,autoprefixer = require('autoprefixer')
    ,cssnano = require('cssnano')
    ,plumber = require('gulp-plumber')
    ,changed = require('gulp-changed')
    ,cached = require('gulp-cached')
    ,jadeInheritance = require('gulp-jade-inheritance')
    ,gulpif = require('gulp-if')
    ,filter = require('gulp-filter')
    ,dependents = require('gulp-dependents')
    ,imagemin = require('gulp-imagemin')
    ,zip = require('gulp-zip')
    ,clean = require('gulp-clean')
    ,fileSync = require('gulp-file-sync')
    ,browserSync = require('browser-sync')
    ,reload = browserSync.reload
;

//获取插件
var requireDir = require('require-dir')('./gulp_tasks');

var config = require('./gulp_config.json');




//通用文件拷贝
function watchOtrher (type) {
    gulp.watch(['src/content/'+type+'/**/*.*'], function(){
        fileSync('src/content/'+type,'dist/content/'+type,{recursive: true});
    });
};





gulp.task('watch',['less', 'jade','imagemin'],function () {
     browserSync({
        server: {
              baseDir: "./",//浏览器打开访问的路径
              directory: true,
        },
        browser:[
           "google chrome",
           // "firefox"
           //"Safari"
        ],
         notify:false,//禁止弹出信息
         open:'external',//是否自动打开浏览器
     });
     var watcherJade = gulp.watch(config.src.jadePath, ['jade-watch']);
     var watcherCss = gulp.watch(config.src.lessPath, ['less']); // 监视
     var watcherImg = gulp.watch(config.src.imgPath, ['imagemin']); // 监视
     var watcherJs = gulp.watch(config.src.jsPath, ['js']); // 监视

     watchOtrher('font');
     watchOtrher('js/vendor');

     var srcReg = /([\/\\])(?:src)\1?(\w*)?\1(.*?)(\.[A-Za-z]{1,10}$)/;

     watcherJade.on('change', function(event) {
         if (event.type === 'deleted') {
             var src = event.path;
             var dest = src.replace(srcReg, '$1dist$1html$1$3.html');
             console.log(src);
             console.log(dest);
             del.sync(dest);
         }
     });
     watcherCss.on('change',function(event){
         if (event.type === 'deleted') {
             var src = event.path;
             var dest = src.replace(srcReg, '$1dist$1$2$1$3.css');
             console.log(src);
             console.log(dest);
             del.sync(dest);
         }
     });
     watcherImg.on('change',function(event){
         if (event.type === 'deleted') {
             var src = event.path;
             var dest = src.replace(srcReg, '$1dist$1$2$1$3$4');
             console.log(src);
             console.log(dest);
             del.sync(dest);
         }
     });
     watcherJs.on('change',function(event){
         if (event.type === 'deleted') {
             var src = event.path;
             var dest = src.replace(srcReg, '$1dist$1$2$1$3$4');
             console.log(src);
             console.log(dest);
             del.sync(dest);
         }
     });


});
