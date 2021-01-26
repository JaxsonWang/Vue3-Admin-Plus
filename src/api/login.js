/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：login.js
 * 创建日期：2021/1/26 下午6:14
 * 创建作者：jaxson
 */

import request from '@/utils/request'

export const login = data => {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data: data
  })
}

export const getInfo = data => {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data: data
  })
}

export const logout = data => {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data: data
  })
}
