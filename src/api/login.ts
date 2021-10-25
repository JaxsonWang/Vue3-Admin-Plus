import type { AxiosPromise, AxiosRequestConfig } from 'axios'
import request from '@/utils/request'
import type { LoginParams, LoginResultModel, CaptchaImageModel } from '@/model/UserModel'

export const login = (data: LoginParams) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export const getCaptchaImage = () => {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
