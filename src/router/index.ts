import { createRouter, createRouterMatcher, createWebHashHistory } from 'vue-router'
import { Layout } from '@/layouts'
import type { App } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'
import type { AppRouteRecordRaw } from '#/vue-router'

export const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登陆页面'
    }
  },
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
  }
]

export const asyncRoutes: AppRouteRecordRaw[] = [
  // 404 page must be placed at the end !!!
  {
    path: '*',
    name: '404',
    redirect: '/404',
    meta: {
      hidden: true,
      title: '404页面'
    }
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * 格式化路由
 * @param routes
 */
const fatteningRoutes = (routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] => {
  return routes.flatMap((route: AppRouteRecordRaw) => {
    return route.children ? fatteningRoutes(route.children) : route
  })
}

/**
 * 重置路由
 */
export const resetRouter = (routes: AppRouteRecordRaw[] = constantRoutes): void => {
  routes.forEach((route: AppRouteRecordRaw) => {
    if (route.children) {
      route.children = fatteningRoutes(route.children)
    }
  })
}
// export const resetRouter = (): void => {
//   router.getRoutes().forEach((route: RouteRecord) => {
//     const { name } = route
//     if (name) {
//       router.hasRoute(name) && router.removeRoute(name)
//     }
//   })
// }

/**
 * 安装路由
 * @param app
 */
export const setupRouter = (app: App<Element>): void => {
  app.use(router)
}

export default router
