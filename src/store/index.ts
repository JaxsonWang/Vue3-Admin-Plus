import { createStore } from 'vuex'

import { store as app, AppStore, State as AppState } from '@/store/modules/app'
import { store as router, RouterStore, State as RouterState } from '@/store/modules/router'
import { store as settings, SettingsStore, State as SettingsState } from '@/store/modules/settings'
import { store as tagsView, TagsViewStore, State as TagsViewState } from '@/store/modules/tagsView'
import { store as user, UserStore, State as UserState } from '@/store/modules/user'

export type RootState = {
  app: AppState
  settings: SettingsState
  router: RouterState
  tagsView: TagsViewState
  user: UserState
}

export type Store = AppStore<Pick<RootState, 'app'>> &
  RouterStore<Pick<RootState, 'router'>> &
  SettingsStore<Pick<RootState, 'settings'>> &
  TagsViewStore<Pick<RootState, 'tagsView'>> &
  UserStore<Pick<RootState, 'user'>>

const store = createStore<RootState>({
  modules: {
    app,
    router,
    settings,
    tagsView,
    user
  }
})

export default store
