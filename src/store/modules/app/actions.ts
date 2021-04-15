/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：actions.ts
 * 创建日期：2021年04月15日
 * 创建作者：Jaxson
 */

import { ActionContext, ActionTree } from 'vuex'

import { RootState } from '@/store'

import { Mutations, MutationType } from './mutations'
import { State } from './state'

export enum AppActionTypes {
  toggleSidebar = 'TOGGLE_SIDEBAR'
}

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
}

export type Actions = {
  [AppActionTypes.toggleSidebar](context: ActionAugments): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  [AppActionTypes.toggleSidebar]({ commit }) {
    commit(MutationType.toggleSidebar)
  }
}
