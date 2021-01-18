import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/Dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Home'),
        meta: {
          title: '系统首页',
          icon: 'dashboard'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
