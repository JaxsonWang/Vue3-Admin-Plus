/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：request.js
 * 创建日期：2021/1/26 下午5:49
 * 创建作者：jaxson
 */

import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API + process.env.VUE_APP_URI : window.app.VUE_APP_BASE_API + window.app.VUE_APP_URI,
  withCredentials: false,
  timeout: 10 * 1000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers = {
        Authorization: store.getters.token
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
