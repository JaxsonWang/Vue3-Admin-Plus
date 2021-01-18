import { createApp } from 'vue'

// 载入重置样式表
import 'normalize.css/normalize.css'
// 载入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// 载入全局变量样式表
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

// 注册图标组件
import icon from '@/icons'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)

icon(app)

app.mount('#app')
