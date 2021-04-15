/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：mutations.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */
import { MutationTree } from 'vuex'
import { State } from './state'

export enum MutationType {
  toggleSidebar = 'TOGGLE_SIDEBAR',
  closeSidebar = 'CLOSE_SIDEBAR',
  toggleDevice = 'TOGGLE_DEVICE'
}

export type Mutations<S = State> = {
  [MutationType.toggleSidebar](state: S): void
  [MutationType.closeSidebar](state: S, payload: any): void
  [MutationType.toggleDevice](state: S, payload: string): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.toggleSidebar]: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    localStorage.setItem('sidebarStatus', state.sidebar.opened.toString())
  },
  [MutationType.closeSidebar]: (state, { withoutAnimation }) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    localStorage.setItem('sidebarStatus', 'false')
  },
  [MutationType.toggleDevice]: (state, device) => {
    state.device = device
  }
}
