/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：actions.ts
 * 创建日期：2021年04月13日
 * 创建作者：Jaxson
 */

import { useStore, ActionContext, ActionTree, DispatchOptions } from 'vuex'

import { RootState } from '@/store'
import { TagsViewActionTypes } from '@/store/modules/tagsView/actions'

import { Mutations, MutationType } from './mutations'
import { State } from './state'

import { constantRoutes } from '@/router'
import { request } from '@/utils/request'
import { setToken, removeToken } from '@/utils/cookie'

export enum UserActionTypes {
  login = 'LOGIN',
  getInfo = 'GET_INFO',
  logout = 'LOGOUT',
  resetToken = 'RESET_TOKEN'
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
  [UserActionTypes.login](context: ActionAugments, userInfo: any): Promise<any>
  [UserActionTypes.getInfo](context: ActionAugments): Promise<any>
  [UserActionTypes.logout](context: ActionAugments): Promise<any>
  [UserActionTypes.resetToken](context: ActionAugments): Promise<any>
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [UserActionTypes.login]({ commit }, userInfo) {
    try {
      const { username, password } = userInfo
      const response: any = await request.post('/login', {
        username: username.trim(),
        password: password
      })
      commit(MutationType.setToken, response.token)
      setToken(response.token)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async [UserActionTypes.getInfo]({ commit }) {
    try {
      const response: any = await request.get('/user/getInfo')
      const formatRoutes: any[] = []
      const asyncRoutes: any[] = [...formatRoutes, ...constantRoutes]
      commit(MutationType.setName, response.nickname)
      commit(MutationType.setAvatar, 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
      commit(MutationType.setRoutes, asyncRoutes)
      return Promise.resolve(asyncRoutes)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async [UserActionTypes.logout]({ commit }) {
    try {
      removeToken()
      commit(MutationType.resetState)
      await useStore().dispatch(TagsViewActionTypes.delAllViews, null, { root: true })
      return Promise.resolve('ok')
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async [UserActionTypes.resetToken]({ commit }) {
    try {
      removeToken()
      commit(MutationType.resetState)
      return Promise.resolve('ok')
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
