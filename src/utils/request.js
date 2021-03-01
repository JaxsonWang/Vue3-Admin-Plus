/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：request.js
 * 创建日期：2021/1/26 下午5:49
 * 创建作者：Jaxson
 */

import axios from 'axios'
// import qs from 'qs'
import { ElMessage } from 'element-plus'
import store from '@/store'

export const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API + process.env.VUE_APP_URI : window.VUE_APP.VUE_APP_BASE_API + window.VUE_APP.VUE_APP_URI,
  withCredentials: false,
  timeout: 10 * 1000
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  // }
})

request.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers = {
      Authorization: 'Bearer ' + store.getters.token
    }
  }
  // if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
  //   config.data = qs.stringify(config.data)
  // }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  const { data } = response
  if (data.statusCode !== 200) {
    ElMessage({
      message: data.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(data.message || 'Error'))
  } else {
    return data
  }
}, error => {
  const { response } = error
  let data = '未知错误'
  if (response !== undefined) {
    switch (response.data.statusCode) {
      case 401:
        ElMessage({
          message: '用户 token 已失效，请重新登录！',
          type: 'error',
          duration: 5 * 1000
        })
        data = '用户 token 已失效，请重新登录！'
        break
      default:
        ElMessage({
          message: response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
        data = response.data.message
    }
  } else {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    data = error.message
  }
  return Promise.reject(data)
})
