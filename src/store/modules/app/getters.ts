/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：getters.ts
 * 创建日期：2021年04月13日
 * 创建作者：Jaxson
 */

import { GetterTree } from 'vuex'

import { RootState } from '@/store'

import { State, SideBarType } from './state'

export type Getters = {
  sidebar(state: State): SideBarType
  device(state: State): string
}

export const getters: GetterTree<State, RootState> & Getters = {
  sidebar: state => state.sidebar,
  device: state => state.device
}
