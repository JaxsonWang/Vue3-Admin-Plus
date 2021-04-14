/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：state.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */
import { RouteRecordRaw } from 'vue-router'

import { getToken } from '@/utils/cookie'

export type State = {
  token: string
  name: string
  avatar: string
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
}

export const getDefaultState = (): State => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    addRoutes: []
  }
}

export const state: State = getDefaultState()
