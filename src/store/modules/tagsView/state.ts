/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：state.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */
import { RouteLocationNormalized } from 'vue-router'

export type RouteItem = Partial<RouteLocationNormalized> & {
  meta: any
}

export type State = {
  visitedViews: RouteItem[]
  cachedViews: string[]
}

export const state: State = {
  visitedViews: [],
  cachedViews: []
}
