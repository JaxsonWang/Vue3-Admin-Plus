/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：cookie.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

import Cookies from 'js-cookie'

const TokenKey = '_user_token'

/**
 * 获取 Cookie
 */
export const getToken = (): string => {
  return Cookies.get(TokenKey) || ''
}

/**
 * 设置 Cookie
 */
export const setToken = (token: string): string => {
  return Cookies.set(TokenKey, token) || ''
}

/**
 * 移除 Cookie
 */
export const removeToken = (): void => {
  return Cookies.remove(TokenKey)
}
