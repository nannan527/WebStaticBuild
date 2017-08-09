# 基于gulp的静态页面构建工具

## 基本功能

* html使用jade(pug)生成
* css 使用less + postcss 方式生成
* js 加入 babel-polyfill
* 自动压缩图片
* 浏览器热更新


## 使用方式

* 全局安装 gulp。
* 当前文件夹路径下打开终端使用npm下载依赖包。
* 然后终端直接运行 gulp watch。


## 一些注意事项

* src为编码文档，dist为产出文档。
* jade和less做了增量编译必须英文命名文件名。
* jade和less约定以“_”开头的文件夹会被gulp忽略。
* js文件夹下的vendor文件夹默认不参与编译直接copy至dist。

