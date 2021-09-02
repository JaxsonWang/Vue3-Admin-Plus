import { createApp } from 'vue'
import App from '@/App.vue'

import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupElementPlus, setupAppIcon, setupRSW } from '@/plugins'

import '@/styles/index.scss'

const app = createApp(App)

setupStore(app)
setupRouter(app)
setupElementPlus(app)
setupAppIcon(app)
setupRSW()

app.mount('#app')
