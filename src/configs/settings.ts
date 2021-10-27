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
  routesWhiteList: ['/login', '/404', '/403'],
  // token失效回退到登录页时是否记录本次的路由（是否记录当前tab页）
  recordRoute: true,
  // 是否开启登录拦截
  loginInterception: true,
  // intelligence(前端导出路由)和all(后端导出路由)两种方式
  authentication: 'all',
  // 是否开启roles字段进行角色权限控制 (如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段)
  rolesControl: true
}

export default settingConfig
