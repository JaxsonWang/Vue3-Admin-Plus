/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：index.ts
 * 创建日期：2021年04月13日
 * 创建作者：Jaxson
 */

import { Store as VuexStore, CommitOptions, DispatchOptions, Module } from 'vuex'

import { RootState } from '@/store'
import { state } from './state'
import { getters, Getters } from './getters'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'

import type { State } from './state'

export { State }

export type UserStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export const store: Module<State, RootState> = {
  state,
  mutations,
  actions,
  getters
}
