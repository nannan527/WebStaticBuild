/*
 * @Author: Orlando
 * @Date: 2022-04-14 11:08:42
 * @LastEditors: Orlando
 * @LastEditTime: 2022-04-22 08:18:38
 * @Description:
 */
const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const filter = require('gulp-filter');
const cached = require('gulp-cached');
const dependents = require('gulp-dependents');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const del = require('del');
// 加载路径配置文件
const config = require('./gulp_config.json');

function taskSass() {
  var plugins = [
    autoprefixer({
      Browserslist: ['> 1%', 'IE 10'],
    }),
    cssnano({
      discardComments: {
        removeAll: true,
      },
      mergeLonghand: true,
      zindex: false,
    }),
  ];

  return src(config.src.sassPath)
    .pipe(cached('scss'))
    .pipe(dependents())
    .pipe(filter((file) => !/\/_/.test(file.path) && !/\_/.test(file.relative)))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(dest(config.dist.cssPath))
    .pipe(
      reload({
        stream: true,
      })
    );
}

exports.taskSass = taskSass;
exports.watchSass = function watchSass() {
  return watch(config.src.sassPath, taskSass).on('unlink', async (path) => {
    let src = path;
    let dist = src.replace(/(?:src)([\/\\])?(\w*)?\1(.*?)(\.[A-Za-z]{1,10}$)/, 'dist$1$2$1$3.css');
    await del([dist]);
    console.log('Deleted files:', src);
    console.log('Deleted files:', dist);
  });
};
