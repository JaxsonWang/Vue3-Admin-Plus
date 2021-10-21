import request from '@/utils/request'
import type { LoginParams } from '@/model/UserModel'

export const login = (data: LoginParams) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
