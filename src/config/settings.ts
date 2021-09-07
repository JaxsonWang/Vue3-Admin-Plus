/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：settings.ts
 * 创建日期：2021年09月07日
 * 创建作者：Jaxson
 */

import type { SettingConfig } from '#/config'

const settingConfig: SettingConfig = {
  // 系统标题名称
  title: 'Vue3 Admin Plus',
  // 系统标题名称反转显示
  titleReverse: false,
  // token 信息
  tokenName: 'vue_plus_token',
  // 路由白名单，不经过 token 校验
  routesWhitelist: ['/', '/home', '/login', '/404', '/403']
}

export default settingConfig
