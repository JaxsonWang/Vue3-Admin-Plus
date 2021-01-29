import { createApp } from 'vue'

// 载入重置样式表
import 'normalize.css/normalize.css'
// 载入 Element Plus
import ElementPlus from 'element-plus'

// 载入全局变量样式表
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

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
app.use(ElementPlus)

// 挂载节点
app.mount('#app')
