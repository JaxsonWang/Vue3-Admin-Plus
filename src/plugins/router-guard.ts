/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：router-guard.ts
 * 创建日期：2021年09月03日
 * 创建作者：Jaxson
 */

import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { useStoreAppWithOut } from '@/store/modules/app'

const { getTheme: { showProgressBar }} = useStoreAppWithOut()

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
    next()
  })

  router.afterEach(() => {
    if (showProgressBar) NProgress.done()
  })
}
