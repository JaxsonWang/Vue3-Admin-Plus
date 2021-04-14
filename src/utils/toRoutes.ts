/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：toRoutes.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */
import { RouteRecordRaw } from 'vue-router'
import { Layout as DefaultLayout } from '@/layout'

export const dataToRoutes = (data: RouteRecordRaw[]): any => {
  return data.map((item: any) => {
    const tmp = { ...item }
    // 实例化路径
    if (tmp.component === 'layout/default') {
      tmp.component = DefaultLayout
    } else {
      const subView = tmp.component
      tmp.component = () => Promise.resolve(require(`@/views/${subView}`).default)
    }
    if (tmp.children) {
      tmp.children = dataToRoutes(tmp.children)
    }
    return tmp
  })
}
