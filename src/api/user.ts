/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：user.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */
import { AxiosResponse } from 'axios'
import { request } from '@/utils/request'

interface LoginParams {
  username: string
  password: string
}

export const login = (data: LoginParams): Promise<AxiosResponse> => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
