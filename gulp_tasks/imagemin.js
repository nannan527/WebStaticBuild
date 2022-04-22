/*
 * @Author: Orlando
 * @Date: 2022-04-20 17:16:14
 * @LastEditors: Orlando
 * @LastEditTime: 2022-04-22 08:17:37
 * @Description:
 */
const { src, dest, watch } = require('gulp');
const plumber = require('gulp-plumber');
const cached = require('gulp-cached');
const changed = require('gulp-changed');
const del = require('del');
// 加载路径配置文件
const config = require('./gulp_config.json');

async function taskImg() {
  const imagemin = await import('gulp-imagemin');
  let { gifsicle, mozjpeg, optipng, svgo } = imagemin;

  return src(config.src.imgPath)
    .pipe(plumber())
    .pipe(changed(config.dist.imgPath))
    .pipe(cached('png,jpg,gif,svg,webp'))
    .pipe(
      imagemin.default([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 60, progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo({
          plugins: [
            {
              name: 'removeUselessDefs',
              active: false,
            },
            {
              name: 'cleanupIDs',
              active: false,
            },
            {
              name: 'removeViewBox',
              active: false,
            },
            {
              name: 'convertPathData',
              actvie: false,
            },
            {
              name: 'mergePaths',
              active: false,
            },
            {
              name: 'removeXMLProcInst',
              active: false,
            },
            {
              name: 'removeUnknownsAndDefaults',
              active: false,
            },
          ],
        }),
      ])
    )
    .pipe(dest(config.dist.imgPath));
}

exports.taskImg = taskImg;
exports.watchImg = function watchImg() {
  return watch(config.src.imgPath, taskImg).on('unlink', async (path) => {
    let src = path;
    let dist = src.replace(/(?:src)([\/\\])?(\w*)?\1(.*?)(\.[A-Za-z]{1,10}$)/, 'dist$1$2$1$3$4');
    await del([dist]);
    console.log('Deleted files:', src);
    console.log('Deleted files:', dist);
  });
};
