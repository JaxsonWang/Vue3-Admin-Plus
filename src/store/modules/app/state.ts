/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：state.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

export type SideBarType = {
  opened: boolean
  withoutAnimation: boolean
}

export type State = {
  sidebar: SideBarType
  device: string
}

export const state: State = {
  sidebar: {
    opened: localStorage.getItem('sidebarStatus') !== 'null' ? localStorage.getItem('sidebarStatus') !== 'false' : true,
    withoutAnimation: false
  },
  device: 'desktop'
}
