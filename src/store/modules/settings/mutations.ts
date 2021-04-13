/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：mutations.ts
 * 创建日期：2021年04月13日
 * 创建作者：Jaxson
 */
import { MutationTree } from 'vuex'
import { State } from './state'

export enum MutationType {
  changeSetting = 'CHANGE_SETTING'
}

export type Mutations<S = State> = {
  [MutationType.changeSetting](state: S, payload: any): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.changeSetting]: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      ;(state as any)[key] = value
    }
  }
}
