/*
 * @Author: Orlando
 * @Date: 2022-04-14 11:08:42
 * @LastEditors: Orlando
 * @LastEditTime: 2022-04-22 13:04:41
 * @Description:
 */
const { src, dest, watch, series } = require('gulp');
const debug = require('gulp-debug');
const jade = require('gulp-jade');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const cached = require('gulp-cached');
const jadeInheritance = require('gulp-jade-inheritance');
const gulpif = require('gulp-if');
const filter = require('gulp-filter');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const del = require('del');

let runInit = 0;
let isJadeWatch = false;
// 加载路径配置文件
let config = require('./gulp_config.json');

function taskCompileJade() {
  return src(config.src.jadePath)
    .pipe(plumber())
    .pipe(
      changed(config.dist.viewPath, {
        extension: '.html',
      })
    )
    .pipe(gulpif(isJadeWatch, cached('jade')))
    .pipe(
      gulpif(
        runInit != 0,
        jadeInheritance({
          basedir: 'src/jade',
        })
      )
    )
    .pipe(filter((file) => !/\/_/.test(file.path) && !/\_/.test(file.relative)))
    .pipe(
      gulpif(
        runInit != 0,
        debug({
          title: '编译:',
        })
      )
    )
    .pipe(
      jade({
        pretty: true,
      })
    )
    .pipe(gulpif(runInit++ != 0, dest(config.dist.viewPath)));
}

function taskBrowserReload() {
  reload();
}
const taskWatchJade = async () => {
  series(taskCompileJade, taskBrowserReload)();
};

exports.taskJade = taskCompileJade;
exports.taskInitJade = function taskInitJade() {
  isJadeWatch = true;
  return taskCompileJade();
};
exports.watchJade = function watchJade() {
  return watch(config.src.jadePath, taskWatchJade).on('unlink', async (path) => {
    let src = path;
    let dist = src.replace(/(?:src)([\/\\])?(\w*)?\1(.*?)(\.[A-Za-z]{1,10}$)/, 'dist$1html$1$3.html');
    await del([dist]);
    console.log('Deleted files:', src);
    console.log('Deleted files:', dist);
  });
};
