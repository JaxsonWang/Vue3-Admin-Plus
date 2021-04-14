/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：state.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */
import { showSettings, fixedHeader, fixedFooter, sidebarLogo, tagsView } from '@/settings'

export type State = {
  showSettings: boolean
  fixedHeader: boolean
  fixedFooter: boolean
  sidebarLogo: boolean
  tagsView: boolean
}

export const state: State = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  fixedFooter: fixedFooter,
  sidebarLogo: sidebarLogo,
  tagsView: tagsView
}
