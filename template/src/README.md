# wo-template-wx
微信小程序快速构建模板

基于@tool-developer/*基础库，具体参考[@tool-developer/wx-app](https://github.com/tool-developer/wx-miniprogram/tree/main/packages/wx)。

脚手架使用说明，具体参考[@tool-developer/wo-cli](https://github.com/tool-developer/wo-cli#readme)


## 页面模板
1.创建页面
```
 wo page test
```
生成目录为：pages/test/index.js

```
 wo page test/test --no-index
```
生成目录为：pages/test/test.js

2.创建组件
```
  wo page test --template component
```
生成目录为：components/test/index.js

3.创建云函数
```
  wo page test --template cloud
```
生成目录为：cloudfunctions/test/index.js
`注意`:不要有多层目录，而且不要添加--no-index，否则需要手动调整package.json文件


## 问题解决
1. 项目创建后，启动项目后，开发工具会报错

检测项目是否构建npm，由于内部默认是使用了npm仓库模块的，所以第一次启动需要构建npm。

2. 执行`yarn clean`之后，项目启动报错

因为`yarn clean`会清空目录，需要重新构建npm，生成小程序的npm模块目录。
