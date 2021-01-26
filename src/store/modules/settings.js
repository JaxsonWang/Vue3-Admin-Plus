import { showSettings, fixedHeader, fixedFooter, sidebarLogo, tagsView } from '@/settings'

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  fixedFooter: fixedFooter,
  sidebarLogo: sidebarLogo,
  tagsView: tagsView
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, 'key')) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
