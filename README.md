# Vue3 Admin Plus

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-3.0.0-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--plus-1.0.2-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://travis-ci.org/JaxsonWang/Vue3-Element-Admin" rel="nofollow">
    <img src="https://travis-ci.org/JaxsonWang/Vue3-Element-Admin.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/JaxsonWang/Vue3-Element-Admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/JaxsonWang/Vue3-Element-Admin/releases">
    <img src="https://img.shields.io/github/release/JaxsonWang/Vue3-Element-Admin.svg" alt="GitHub release">
  </a>
</p>

## 简介

[Vue3-Admin-Plus](https://jaxsonwang.github.io/Vue3-Admin-Plus) 是一个后台前端解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element-plus](https://element-plus.org)实现。它使用了最新的前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。相信不管你的需求是什么，本项目都能帮助到你。

本项目基于 [PanJiaChen - vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 项目保留原来风格进行编写，页面全部使用 `Component Api` 重构！


- [在线预览](https://jaxsonwang.github.io/Vue3-Admin-Plus)


## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-plus](https://github.com/element-plus/element-plus)，提前了解和学习这些知识会对使用本项目有很大的帮助。


## 开发

```bash
# 克隆项目
git clone https://github.com/JaxsonWang/Vue3-Element-Admin.git

# 进入项目目录
cd Vue3-Element-Admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:8080

## 发布

```bash
# 构建生产环境
npm run build
```

## 其它

```bash
# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 捐赠

<img src="https://img.alicdn.com/imgextra/i1/2038135983/O1CN012t8d2E1u4G8KbRFYp_!!2038135983.png" width="200" height="200" alt="捐赠" />

<img src="https://img.alicdn.com/imgextra/i4/2038135983/O1CN011u4G8M87EOv3N6Q_!!2038135983.jpg" width="200" height="200" alt="捐赠" />

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions |

## License

[MIT](https://github.com/JaxsonWang/Vue3-Element-Admin/blob/master/LICENSE)
