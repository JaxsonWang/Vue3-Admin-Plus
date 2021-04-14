/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：request.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

import { useRoute, useRouter } from 'vue-router'
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

import { setToken } from '@/utils/cookie'
import { UserActionTypes } from '@/store/modules/user/actions'

const baseURL: any = process.env.VUE_APP_BASE_API
const baseApi: any = process.env.VUE_APP_URI

export const request: AxiosInstance = axios.create({
  baseURL: baseURL + baseApi,
  withCredentials: false,
  timeout: 10 * 1000
})

request.interceptors.request.use(
  async config => {
    const { useStore } = await import('@/store')
    if (useStore().getters.token) {
      config.headers = {
        Authorization: 'Bearer ' + useStore().getters.token
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    if (data.statusCode !== 200) {
      ElMessage({
        message: data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(data.message || 'Error'))
    } else {
      // 判断 token 是否存在，如果存在说明后台系统推送新的 token 信息
      // 需要替换 cookie 里的 token
      if (data.token) setToken(data.token)
      return data.data
    }
  },
  async (error: AxiosError) => {
    const { useStore } = await import('@/store')
    const { response } = error
    let data = '未知错误'
    if (response !== undefined) {
      switch (response.data.statusCode) {
        case 401:
          data = '用户 token 已失效，请重新登录！'
          ElMessage({
            message: data,
            type: 'error',
            duration: 5 * 1000
          })
          // 触发触发器并重定向到登录页
          await useStore().dispatch(UserActionTypes.resetToken)
          await useRouter().push(`/login?redirect=${useRoute().path}`)
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
  }
)
