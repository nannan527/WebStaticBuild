# 基于 gulp 的静态页面构建工具

## 基本功能

- html 使用 jade(pug)生成
- css 使用 scss + postcss 方式生成
- js 加入 babel-polyfill
- 自动压缩图片
- 浏览器热更新

## 使用方式

- 全局安装 gulp。
- 当前文件夹路径下打开终端使用 npm 下载依赖包。
- 然后终端直接运行 gulp watch。

## 一些注意事项

- src 为编码文档，dist 为产出文档。
- jade 和 scss 做了增量编译必须英文命名文件名。
- jade 和 scss 约定以“\_”开头的文件夹会被 gulp 忽略。
- js 文件夹下的 vendor 文件夹默认不参与编译直接 copy 至 dist。
