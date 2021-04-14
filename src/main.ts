/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：main.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

import { createApp } from 'vue'

// 载入重置样式表
import 'normalize.css/normalize.css'
// 载入 Element Plus
import ElementPlus from 'element-plus'

// 载入全局变量样式表
import '@/styles/index.scss'
// 国际化
import i18n from '@/lang'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

// 注册图标组件
import SvgIcon from '@/icons'

// 注册权限指令
import Auth from '@/directives/auth'

// 加载路由鉴权
import '@/utils/routeAuth'

// 实例化 Vue App 对象
const app = createApp(App)

// 挂载全局组件
app.component('svg-icon', SvgIcon)

// 挂载指令
app.directive('auth', Auth)

// 注册插件
app.use(store)
app.use(router)
// app.use(ElementPlus)
app.use(ElementPlus, {
  i18n: i18n.global.t
})

app.use(i18n)

// 挂载节点
app.mount('#app')
