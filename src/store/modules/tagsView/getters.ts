/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：getters.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

import { GetterTree } from 'vuex'

import { RootState } from '@/store'

import { State, RouteItem } from './state'

export type Getters = {
  visitedViews(state: State): RouteItem[]
  cachedViews(state: State): string[]
}

export const getters: GetterTree<State, RootState> & Getters = {
  visitedViews: state => state.visitedViews,
  cachedViews: state => state.cachedViews
}
