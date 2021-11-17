/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：configs.d.ts
 * 创建日期：2021年09月06日
 * 创建作者：Jaxson
 */
export interface ThemeConfig {
  showProgressBar: boolean
  menuBackgroundColor: string
  subMenuBackgroundColor: string
  menuTextColor: string
  menuActiveTextColor: string
}

export interface SidebarCollapseConfig {
  collapse: boolean
}

export interface SettingConfig {
  title: string
  titleReverse: boolean
  tokenName: string
  routesWhiteList: string[]
  recordRoute: boolean
  loginInterception: boolean
  authentication: 'all' | 'intelligence'
  rolesControl: boolean,
  logo: string | false
}
