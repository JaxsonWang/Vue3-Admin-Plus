import type { App } from 'vue'
import type { AppRouteRecordRaw } from './types'

import { createRouter, createWebHashHistory, Router, RouteRecordRaw, RouteRecord } from 'vue-router'
import Layout from '@/layouts'

const routes: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: 'AppRoot',
    redirect: '/home',
    component: Layout,
    meta: {
      title: '仪表盘'
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '系统首页'
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: '关于系统'
    }
  }
]

const router: Router | null = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * 重置路由
 */
export const resetRouter = (): void => {
  router.getRoutes().forEach((route: RouteRecord) => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

/**
 * 安装路由
 * @param app
 */
export const setupRouter = (app: App<Element>): void => {
  app.use(router)
}

export default router
