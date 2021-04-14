/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：getters.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

import { GetterTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'

import { RootState } from '@/store'

import { State } from './state'

export type Getters = {
  currentRoute(state: State): RouteRecordRaw[]
}

export const getters: GetterTree<State, RootState> & Getters = {
  currentRoute: state => state.currentRoute
}
