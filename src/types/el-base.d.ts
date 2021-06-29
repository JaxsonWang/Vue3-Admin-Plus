/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：el-base.d.ts
 * 创建日期：2021年04月16日
 * 创建作者：Jaxson
 */

export interface Func {
  (...args: any[]): any
}

export interface ElButton {
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default'
  size: 'medium' | 'small' | 'mini'
  icon: string
  nativeType: 'button' | 'submit' | 'reset'
  loading: boolean
  disabled: boolean
  plain: boolean
  autofocus: boolean
  round: boolean
  circle: boolean
}
