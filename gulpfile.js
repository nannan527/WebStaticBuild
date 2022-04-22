/*
 * @Author: Orlando
 * @Date: 2022-04-20 17:00:26
 * @LastEditors: Orlando
 * @LastEditTime: 2022-04-22 13:12:16
 * @Description:
 */
const fs = require('fs');
const { parallel, series } = require('gulp');
const browserSync = require('browser-sync');
//获取插件
const { taskInitJade, taskJade, watchJade } = require('./gulp_tasks/jade.js');
const { taskSass, watchSass } = require('./gulp_tasks/sass.js');
const { taskJs, watchJs } = require('./gulp_tasks/js.js');
const { taskImg, watchImg } = require('./gulp_tasks/imagemin.js');
const { watchOtrher } = require('./gulp_tasks/other');

//监控
function taskWatch() {
  let watcherFn = parallel(watchOtrher, watchJade, watchSass, watchJs, watchImg);
  if (!fs.existsSync('./dist')) {
    series(taskJade, parallel(taskSass, taskJs, taskImg), taskInitJade, watcherFn)();
  } else {
    parallel(taskInitJade, watcherFn)();
  }

  browserSync({
    server: {
      baseDir: './', //浏览器打开访问的路径
      directory: true,
    },
    browser: ['google chrome'],
    notify: false, //禁止弹出信息
    open: 'external', //是否自动打开浏览器
  });
}

exports.default = taskWatch;
exports.watch = taskWatch;
