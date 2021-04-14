/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：getters.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

import { GetterTree } from 'vuex'

import { RootState } from '@/store'

import { State } from './state'

export type Getters = {
  showSettings(state: State): boolean
  fixedHeader(state: State): boolean
  fixedFooter(state: State): boolean
  sidebarLogo(state: State): boolean
  tagsView(state: State): boolean
}

export const getters: GetterTree<State, RootState> & Getters = {
  showSettings: state => state.showSettings,
  fixedHeader: state => state.showSettings,
  fixedFooter: state => state.showSettings,
  sidebarLogo: state => state.showSettings,
  tagsView: state => state.showSettings
}
