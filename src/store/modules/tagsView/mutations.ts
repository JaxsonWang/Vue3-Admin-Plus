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
  addVisitedView = 'ADD_VISITED_VIEW',
  addCachedView = 'ADD_CACHED_VIEW',
  delVisitedView = 'DEL_VISITED_VIEW',
  delCachedView = 'DEL_CACHED_VIEW',
  delOthersVisitedViews = 'DEL_OTHERS_VISITED_VIEWS',
  delOthersCachedViews = 'DEL_OTHERS_CACHED_VIEWS',
  delAllVisitedViews = 'DEL_ALL_VISITED_VIEWS',
  delAllCachedViews = 'DEL_ALL_CACHED_VIEWS',
  updateVisitedView = 'UPDATE_VISITED_VIEW'
}

export type Mutations<S = State> = {
  [MutationType.addVisitedView](state: S, payload: any): void
  [MutationType.addCachedView](state: S, payload: any): void
  [MutationType.delVisitedView](state: S, payload: any): void
  [MutationType.delCachedView](state: S, payload: any): void
  [MutationType.delOthersVisitedViews](state: S, payload: any): void
  [MutationType.delOthersCachedViews](state: S, payload: any): void
  [MutationType.delAllVisitedViews](state: S): void
  [MutationType.delAllCachedViews](state: S): void
  [MutationType.updateVisitedView](state: S, payload: any): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.addVisitedView]: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  [MutationType.addCachedView]: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  [MutationType.delVisitedView]: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  [MutationType.delCachedView]: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  [MutationType.delOthersVisitedViews]: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  [MutationType.delOthersCachedViews]: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  [MutationType.delAllVisitedViews]: state => {
    // keep affix tags
    state.visitedViews = state.visitedViews.filter(tag => tag.meta.affix)
  },
  [MutationType.delAllCachedViews]: state => {
    state.cachedViews = []
  },
  [MutationType.updateVisitedView]: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}
