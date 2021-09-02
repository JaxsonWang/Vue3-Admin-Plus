import type { App } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

export const setupStore = (app: App<Element>) :void => {
  app.use(store)
}

export default store
