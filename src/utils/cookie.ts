/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：auth.js
 * 创建日期：2021/1/26 下午3:54
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
