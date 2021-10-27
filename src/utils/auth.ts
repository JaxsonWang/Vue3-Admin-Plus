/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：auth.ts
 * 创建日期：2021年09月07日
 * 创建作者：Jaxson
 */

import cookies from 'js-cookie'
import config from '@/configs'

const { tokenName } = config

/**
 * 获取 token 信息
 */
export const getToken = (): string | undefined => {
  return cookies.get(tokenName)
}

/**
 * 设置 token 信息
 * @param token
 */
export const setToken = (token: string): string | undefined => {
  return cookies.set(tokenName, token)
}

/**
 * 移除 token 信息
 */
export const removeToken = (): void => {
  return cookies.remove(tokenName)
}
