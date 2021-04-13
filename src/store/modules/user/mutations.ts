/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：mutations.ts
 * 创建日期：2021年04月13日
 * 创建作者：Jaxson
 */
import { MutationTree } from 'vuex'

import { asyncRoutes } from '@/router'

import { State, getDefaultState } from './state'

export enum MutationType {
  resetState = 'RESET_STATE',
  setToken = 'SET_TOKEN',
  setName = 'SET_NAME',
  setAvatar = 'SET_AVATAR',
  setRoutes = 'SET_ROUTES'
}

export type Mutations<S = State> = {
  [MutationType.resetState](state: S, payload: string): void
  [MutationType.setToken](state: S, payload: string): void
  [MutationType.setName](state: S, payload: string): void
  [MutationType.setAvatar](state: S, payload: string): void
  [MutationType.setRoutes](state: S, payload: any[]): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.resetState]: state => {
    Object.assign(state, getDefaultState())
  },
  [MutationType.setToken]: (state, token) => {
    state.token = token
  },
  [MutationType.setName]: (state, name) => {
    state.name = name
  },
  [MutationType.setAvatar]: (state, avatar) => {
    state.avatar = avatar
  },
  [MutationType.setRoutes]: (state, routes) => {
    state.addRoutes = routes
    state.routes = [...asyncRoutes, ...routes]
  }
}
