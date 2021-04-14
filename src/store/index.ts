/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：index.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

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

export const useStore = (): Store => store as Store

export default store
