/*
 * @Author: Orlando
 * @Date: 2022-04-22 10:57:15
 * @LastEditors: Orlando
 * @LastEditTime: 2022-04-22 10:58:34
 * @Description:
 */
const { watch } = require('gulp');
const fileSync = require('gulp-file-sync');

//通用文件拷贝
function watchOtrher() {
  let list = ['font', 'js/vendor'];
  list.forEach((type) => {
    let src = `src/content/${type}`;
    let dist = `dist/content/${type}`;
    watch([`${src}/**/*.*`], () => {
      fileSync(src, dist, { recursive: true });
    });
  });
}

exports.watchOtrher = watchOtrher;
