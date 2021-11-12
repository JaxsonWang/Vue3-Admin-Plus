/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：router-guard.ts
 * 创建日期：2021年09月03日
 * 创建作者：Jaxson
 */

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import { useAppWithOut } from '@/store/modules/app'
import { useUserWithOut } from '@/store/modules/user'
import { useRoutesWithOut } from '@/store/modules/routes'
import config from '@/configs'
import { getPageTitle } from '@/utils'

import type { Router } from 'vue-router'

const { loginInterception, routesWhiteList } = config
const { theme: { showProgressBar }} = useAppWithOut()

if (showProgressBar) {
  NProgress.configure({
    easing: 'ease',
    speed: 500,
    trickle: true,
    trickleSpeed: 200,
    showSpinner: false
  })
}

/**
 * 路由守卫
 * @param router 路由对象
 */
export const setupRouterGuard = (router: Router): void => {
  router.beforeEach((to, from, next) => {
    if (showProgressBar) NProgress.start()

    // 获取用户鉴权信息
    let hasToken: string | boolean | undefined = useUserWithOut().token

    if (!loginInterception) hasToken = true

    if (hasToken) {
      if (useRoutesWithOut().routes.length) {
        if (to.path === '/login') {
          next({ path: '/' })
          if (showProgressBar) NProgress.done()
        } else {
          // 根据当前用户获取路由信息
          next()
        }
      } else {
        if (useUserWithOut().name) {
          next()
        } else {
          try {
            loginInterception ? useUserWithOut().getUserInfo() : useUserWithOut().setVirtualRoles()
            useRoutesWithOut().setRoutes().then(() => {
              next({ ...to, replace: true })
            })
          } catch (error) {
            ElMessage.error((error as Error) || 'Has Error')
            useUserWithOut().resetAll().then()
            next(`/login?redirect=${to.path}`)
          }
        }
      }
    } else {
      if (routesWhiteList.includes(to.path)) {
        next()
      } else {
        next('/login')
      }
    }
  })

  router.afterEach((to) => {
    if (showProgressBar) NProgress.done()
    // 设置文档标题
    document.title = getPageTitle(to.meta.title)
  })
}
