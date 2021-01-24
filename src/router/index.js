import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/default'

const routes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '系统首页',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Home'),
        meta: {
          title: '仪表盘',
          icon: 'el-icon-info',
          affix: true
        }
      }
    ]
  },
  {
    path: '/test1',
    component: Layout,
    redirect: '/test1/dashboard1',
    meta: {
      title: '系统首页1',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard1',
        name: 'Dashboard1',
        component: () => import('@/views/Home'),
        meta: {
          title: '仪表盘1',
          icon: 'dashboard'
        },
        children: [
          {
            path: 'dashboard1-1',
            name: 'Dashboard1-1',
            component: () => import('@/views/Home'),
            meta: {
              title: '仪表盘1-1',
              icon: 'dashboard'
            },
            children: [
              {
                path: 'dashboard1-1-1',
                name: 'Dashboard1-1-1',
                component: () => import('@/views/Home'),
                meta: {
                  title: '仪表盘1-1-1',
                  icon: 'dashboard'
                }
              },
              {
                path: 'dashboard1-1-2',
                name: 'Dashboard1-1-2',
                component: () => import('@/views/Home'),
                meta: {
                  title: '仪表盘1-1-2',
                  icon: 'dashboard'
                }
              }
            ]
          },
          {
            path: 'dashboard1-2',
            name: 'Dashboard1-2',
            component: () => import('@/views/Home'),
            meta: {
              title: '仪表盘1-2',
              icon: 'dashboard'
            }
          }
        ]
      },
      {
        path: 'about1',
        name: 'About1',
        component: () => import('@/views/About'),
        meta: {
          title: '关于1',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/test2',
    component: Layout,
    redirect: '/test2/dashboard2',
    meta: {
      title: '系统首页',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard2',
        name: 'Dashboard2',
        component: () => import('@/views/Home'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard'
        }
      },
      {
        path: 'about2',
        name: 'About2',
        component: () => import('@/views/About'),
        meta: {
          title: '关于',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/test3',
    component: Layout,
    redirect: '/test3/dashboard3',
    meta: {
      title: '系统首页',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard3',
        name: 'Dashboard3',
        component: () => import('@/views/Home'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard'
        }
      },
      {
        path: 'about3',
        name: 'About3',
        component: () => import('@/views/About'),
        meta: {
          title: '关于',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/test4',
    component: Layout,
    redirect: '/test4/dashboard4',
    meta: {
      title: '系统首页',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard4',
        name: 'Dashboard4',
        component: () => import('@/views/Home'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard'
        }
      },
      {
        path: 'about4',
        name: 'About4',
        component: () => import('@/views/About'),
        meta: {
          title: '关于',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/test5',
    component: Layout,
    redirect: '/test5/dashboard5',
    meta: {
      title: '系统首页',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard5',
        name: 'Dashboard5',
        component: () => import('@/views/Home'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard'
        }
      },
      {
        path: 'about5',
        name: 'About5',
        component: () => import('@/views/About'),
        meta: {
          title: '关于',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/test6',
    component: Layout,
    redirect: '/test6/dashboard6',
    meta: {
      title: '系统首页',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard6',
        name: 'Dashboard6',
        component: () => import('@/views/Home'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard'
        }
      },
      {
        path: 'about6',
        name: 'About6',
        component: () => import('@/views/About'),
        meta: {
          title: '关于',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
