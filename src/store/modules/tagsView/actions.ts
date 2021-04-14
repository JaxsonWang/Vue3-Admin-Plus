/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：actions.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

import { ActionContext, ActionTree, DispatchOptions } from 'vuex'

import { RootState } from '@/store'

import { Mutations, MutationType } from './mutations'
import { State } from './state'

export enum TagsViewActionTypes {
  addView = 'ADD_VIEW',
  addVisitedView = 'ADD_VISITED_VIEW',
  addCachedView = 'ADD_CACHED_VIEW',
  delView = 'DEL_VIEW',
  delVisitedView = 'DEL_VISITED_VIEW',
  delCachedView = 'DEL_CACHED_VIEW',
  delOthersViews = 'DEL_OTHERS_VIEWS',
  delOthersVisitedViews = 'DEL_OTHERS_VISITED_VIEWS',
  delOthersCachedViews = 'DEL_OTHERS_CACHED_VIEWS',
  delAllViews = 'DEL_ALL_VIEWS',
  delAllVisitedViews = 'DEL_ALL_VISITED_VIEWS',
  delAllCachedViews = 'DEL_ALL_CACHED_VIEWS',
  updateVisitedView = 'UPDATE_VISITED_VIEW'
}

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export type Actions = {
  [TagsViewActionTypes.addView](context: ActionAugments, view: any): void
  [TagsViewActionTypes.addVisitedView](context: ActionAugments, view: any): void
  [TagsViewActionTypes.addCachedView](context: ActionAugments, view: any): void
  [TagsViewActionTypes.delView](context: ActionAugments, view: any): Promise<any>
  [TagsViewActionTypes.delVisitedView](context: ActionAugments, view: any): void
  [TagsViewActionTypes.delCachedView](context: ActionAugments, view: any): Promise<any>
  [TagsViewActionTypes.delOthersViews](context: ActionAugments, view: any): Promise<any>
  [TagsViewActionTypes.delOthersVisitedViews](context: ActionAugments, view: any): Promise<any>
  [TagsViewActionTypes.delOthersCachedViews](context: ActionAugments, view: any): Promise<any>
  [TagsViewActionTypes.delAllViews](context: ActionAugments, view: any): Promise<any>
  [TagsViewActionTypes.delAllVisitedViews](context: ActionAugments): Promise<any>
  [TagsViewActionTypes.delAllCachedViews](context: ActionAugments): Promise<any>
  [TagsViewActionTypes.updateVisitedView](context: ActionAugments, view: any): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  [TagsViewActionTypes.addView]({ dispatch }, view) {
    dispatch(TagsViewActionTypes.addVisitedView, view)
    dispatch(TagsViewActionTypes.addCachedView, view)
  },
  [TagsViewActionTypes.addVisitedView]({ commit }, view) {
    commit(MutationType.addVisitedView, view)
  },
  [TagsViewActionTypes.addCachedView]({ commit }, view) {
    commit(MutationType.addCachedView, view)
  },
  [TagsViewActionTypes.delView]({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch(TagsViewActionTypes.delVisitedView, view)
      dispatch(TagsViewActionTypes.delCachedView, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  [TagsViewActionTypes.delVisitedView]({ commit, state }, view) {
    return new Promise(resolve => {
      commit(MutationType.delVisitedView, view)
      resolve([...state.visitedViews])
    })
  },
  [TagsViewActionTypes.delCachedView]({ commit, state }, view) {
    return new Promise(resolve => {
      commit(MutationType.delCachedView, view)
      resolve([...state.cachedViews])
    })
  },
  [TagsViewActionTypes.delOthersViews]({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch(TagsViewActionTypes.delOthersVisitedViews, view)
      dispatch(TagsViewActionTypes.delOthersCachedViews, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  [TagsViewActionTypes.delOthersVisitedViews]({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch(TagsViewActionTypes.delOthersVisitedViews, view)
      dispatch(TagsViewActionTypes.delOthersCachedViews, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  [TagsViewActionTypes.delOthersCachedViews]({ commit, state }, view) {
    return new Promise(resolve => {
      commit(MutationType.delOthersCachedViews, view)
      resolve([...state.cachedViews])
    })
  },
  [TagsViewActionTypes.delAllViews]({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch(TagsViewActionTypes.delAllVisitedViews, view)
      dispatch(TagsViewActionTypes.delAllCachedViews, view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  [TagsViewActionTypes.delAllVisitedViews]({ commit, state }) {
    return new Promise(resolve => {
      commit(MutationType.delAllVisitedViews)
      resolve([...state.visitedViews])
    })
  },
  [TagsViewActionTypes.delAllCachedViews]({ commit, state }) {
    return new Promise(resolve => {
      commit(MutationType.delAllCachedViews)
      resolve([...state.cachedViews])
    })
  },
  [TagsViewActionTypes.updateVisitedView]({ commit }, view) {
    commit(MutationType.updateVisitedView, view)
  }
}
