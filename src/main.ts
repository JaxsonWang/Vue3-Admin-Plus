import { createApp } from 'vue'
import App from './App.vue'
// 载入重置样式表
import 'normalize.css/normalize.css'
// 载入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// 载入全局变量样式表
import '@/styles/index.scss'

import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
