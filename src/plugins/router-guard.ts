/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：router-guard.ts
 * 创建日期：2021年09月03日
 * 创建作者：Jaxson
 */

import type { Router } from 'vue-router'

export const setupRouterGuard = (router: Router): void => {
  router.beforeEach((to, from, next) => {
    next()
  })

  router.afterEach(() => {
    console.log('路由加载完毕')
  })
}
