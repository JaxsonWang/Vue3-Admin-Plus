/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：user.js
 * 创建日期：2021/1/26 下午5:44
 * 创建作者：Jaxson
 */

import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo, logout } from '@/api/login'
import { asyncRoutes, constantRoutes } from '@/router'
import { dataToRoutes } from '@/utils/toRoutes'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    addRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = [...asyncRoutes, ...routes]
  }
}

const actions = {
  /**
   * 用户登录
   * @param commit
   * @param userInfo
   * @returns {Promise<*>}
   */
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 获取用户信息
   * @param commit
   * @param state
   * @returns {Promise<{UserInfo}>}
   */
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        const formatRoutes = dataToRoutes(data.routes)
        const asyncRoutes = [...formatRoutes, ...constantRoutes]
        commit('SET_NAME', data.user.name)
        commit('SET_AVATAR', data.user.avatar)
        // 合并路由
        commit('SET_ROUTES', asyncRoutes)
        resolve(asyncRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 清除用户信息
   * @param commit
   * @returns {Promise<*>}
   */
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
