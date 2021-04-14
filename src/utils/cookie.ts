/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：cookie.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

import Cookies from 'js-cookie'

const TokenKey = '_user_token'

export const getToken = (): any => {
  return Cookies.get(TokenKey)
}

export const setToken = (token: string): any => {
  return Cookies.set(TokenKey, token)
}

export const removeToken = (): any => {
  return Cookies.remove(TokenKey)
}
