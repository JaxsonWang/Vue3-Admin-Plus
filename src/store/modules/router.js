/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：router.js
 * 创建日期：2021/1/30 下午5:43
 * 创建作者：Jaxson
 */

const state = {
  currentRoute: []
}

const mutations = {
  SET_CURRENT_ROUTE: (state, route) => {
    state.currentRoute = route
  }
}

const actions = {
  setCurrentRoute: ({ commit }, route) => {
    commit('SET_CURRENT_ROUTE', route)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
