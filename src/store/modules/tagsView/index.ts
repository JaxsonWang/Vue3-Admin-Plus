/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：index.ts
 * 创建日期：2021年04月13日
 * 创建作者：Jaxson
 */

import { Store as VuexStore, CommitOptions, Module } from 'vuex'

import { RootState } from '@/store'
import { state } from './state'
import { getters, Getters } from './getters'
import { mutations, Mutations } from './mutations'

import type { State } from './state'

export { State }

export type TagsViewStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit'> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
}

export const store: Module<State, RootState> = {
  state,
  mutations,
  getters
}
