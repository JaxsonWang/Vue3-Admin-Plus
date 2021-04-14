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
  setCurrentRoute = 'SET_CURRENT_ROUTE'
}

export type Mutations<S = State> = {
  [MutationType.setCurrentRoute](state: S, payload: any[]): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.setCurrentRoute]: (state, routes) => {
    state.currentRoute = routes
  }
}
