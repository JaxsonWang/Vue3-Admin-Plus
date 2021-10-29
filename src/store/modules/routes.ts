/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：routes.ts
 * 创建日期：2021年09月06日
 * 创建作者：Jaxson
 */

import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { asyncRoutes, constantRoutes, resetRouter } from '@/router'
import { getRouteList } from '@/api/router'
import { convertRouter, filterRoutes } from '@/utils/routes'
import { isArray } from '@/utils/validate'
import configs from '@/configs'

import type { AppRouteRecordRaw } from '#/vue-router'

const { authentication, rolesControl } = configs

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
  },
  actions: {
    /**
     * 设置路由
     */
    setRoutes(): Promise<AppRouteRecordRaw[]> {
      return new Promise(async(resolve, reject) => {
        // 默认前端路由
        let routes = [...asyncRoutes]
        // 设置后端路由(不需要可以删除)
        if(authentication === 'all') {
          const { data } = await getRouteList()
          if (!isArray(data)) {
            ElMessage.error('路由格式返回有误！')
          } else {
            if (data[data.length - 1].path !== '*') data.push({ path: '*', name: '404', redirect: '/404', meta: { hidden: true, title: '404' }})
            routes = convertRouter(data)
          }
        }
        // 根据权限和 rolesControl 过滤路由
        const accessRoutes = filterRoutes([...constantRoutes, ...routes], rolesControl)
        // 根据可访问路由重置Vue Router
        resetRouter(accessRoutes)
        // 设置菜单所需路由
        this.routes = accessRoutes
        // 返回内容
        resolve(accessRoutes)
      })
    },
    /**
     * 修改路由信息
     * @param options
     */
    changeMenuMeta(options: AppRouteRecordRaw): void {
      function handleRoutes(routes: AppRouteRecordRaw[]) {
        return routes.map(route => {
          if (route.name === options.name) Object.assign(route.meta, options.meta)
          if (route.children && route.children.length) { route.children = handleRoutes(route.children) }
          return route
        })
      }
      this.routes = handleRoutes(this.routes)
    },
    /**
     * 修改当前菜单内容
     * @param activeName
     */
    changeActiveName(activeName: string): void {
      this.activeName = activeName
    }
  }
})

// 外部引入
export const useRoutesWithOut = () => {
  return useRoutes(store)
}
