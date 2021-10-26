/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：routes.ts
 * 创建日期：2021年09月06日
 * 创建作者：Jaxson
 */

import { defineStore } from 'pinia'
import { AuthenticationEnum } from '@/enums/router.enum'
import type { AppRouteRecordRaw } from '@/router/types'

interface RoutesState {
  routes: AppRouteRecordRaw[]
  activeName: string
}

export const useRoutes = defineStore({
  id: 'routes',
  state: (): RoutesState => ({
    routes: [],
    activeName: ''
  }),
  getters: {
    getRoutes(): AppRouteRecordRaw[] {
      return this.routes
    }
  },
  actions: {
    // setRoutes(routes: AppRouteRecordRaw[]): void {
    //   this.routes = routes
    // }
    setRoutes(mode: AuthenticationEnum): void {
      // this.routes = routes
    }
  }
})
