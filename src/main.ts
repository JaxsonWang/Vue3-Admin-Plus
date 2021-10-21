import { createApp } from 'vue'

import App from '@/App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupAppIcon, setupRouterGuard, setupRSW } from '@/plugins'

import '@/styles/index.scss'

const app = createApp(App)

setupStore(app)
setupRouter(app)
setupRouterGuard(router)
setupAppIcon(app)
setupRSW()

app.mount('#app')
