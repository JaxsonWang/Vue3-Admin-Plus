/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：config.d.ts
 * 创建日期：2021年09月06日
 * 创建作者：Jaxson
 */
import { ContentTypeEnum } from '@/enums/http.enum'

export interface ThemeConfig {
  showProgressBar: boolean
}

export interface SettingConfig {
  title: string
  titleReverse: boolean
  tokenName: string
  routesWhitelist: Array<string>
}
