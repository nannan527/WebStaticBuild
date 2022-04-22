/*
 * @Author: Orlando
 * @Date: 2022-04-14 11:08:42
 * @LastEditors: Orlando
 * @LastEditTime: 2022-04-22 08:18:26
 * @Description:
 */
const { src, dest, watch, series } = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const del = require('del');
// 加载路径配置文件
var config = require('./gulp_config.json');

function taskOtherJs() {
  return src([config.src.jsPath, `!${config.src.jsvendorPath}`])
    .pipe(plumber())
    .pipe(changed(config.dist.jsPath))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(dest(config.dist.jsPath))
    .pipe(
      reload({
        stream: true,
      })
    );
}

function taskVendorJs() {
  return src(config.src.jsvendorPath)
    .pipe(plumber())
    .pipe(changed(config.dist.jsvendorPath))
    .pipe(dest(config.dist.jsvendorPath))
    .pipe(
      reload({
        stream: true,
      })
    );
}

let taskJs = series(taskOtherJs, taskVendorJs);
exports.taskJs = taskJs;
exports.watchJs = function watchJs() {
  return watch(config.src.jsPath, taskJs).on('unlink', async (path) => {
    let src = path;
    let dist = src.replace(/(?:src)([\/\\])?(\w*)?\1(.*?)(\.[A-Za-z]{1,10}$)/, 'dist$1$2$1$3$4');
    await del([dist]);
    console.log('Deleted files:', src);
    console.log('Deleted files:', dist);
  });
};
