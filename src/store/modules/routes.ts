/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：routes.ts
 * 创建日期：2021年09月03日
 * 创建作者：Jaxson
 */
import type { Module, MutationTree, ActionTree } from 'vuex'
import type { AppRouteRecordRaw } from '@/router/types'
import type { RootState } from '@/store'

export interface RoutesState {
  routes: AppRouteRecordRaw[]
  activeName: string
}

const state: RoutesState = {
  routes: [],
  activeName: ''
}

const mutations: MutationTree<RoutesState> = {
  setRoutes(state, routes): void {
    state.routes = routes
  }
}

const actions: ActionTree<RoutesState, RootState> = {
  getRoutes({ commit }): void {
    commit('setRoutes', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
} as Module<RoutesState, RootState>
