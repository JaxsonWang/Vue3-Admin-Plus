/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：index.d.ts
 * 创建日期：2021年09月07日
 * 创建作者：Jaxson
 */

import axiosConfig from './axios'
import themeConfig from './theme'
import settingConfig from './settings'

export default {
  ...axiosConfig,
  ...themeConfig,
  ...settingConfig
}
