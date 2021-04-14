/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：state.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */
import { RouteRecordRaw } from 'vue-router'

export type State = {
  currentRoute: RouteRecordRaw[]
}

export const state: State = {
  currentRoute: []
}
