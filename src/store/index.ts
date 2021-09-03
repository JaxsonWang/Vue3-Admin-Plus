import type { App } from 'vue'
import { createStore } from 'vuex'

import routes, { RoutesState } from './modules/routes'

const store = createStore({
  modules: {
    routes
  }
})

export interface RootState {
  RoutesState: RoutesState
}

export const setupStore = (app: App<Element>) :void => {
  app.use(store)
}

export default store
