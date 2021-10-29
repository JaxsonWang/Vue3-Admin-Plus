import { request } from '@/utils/request'
import type { Result } from '#/axios'

export interface LoginParams {
  username: string
  password: string
  code: string
  uuid: string
}

export interface LoginResult extends Result {
  token: string
}

export interface CaptchaImageResult extends Result {
  captchaOnOff: boolean
  uuid: string
  img: string
}

export interface UserInfoResult extends Result {
  permissions: string[]
  roles: string[]
  user: {
    userId: number
    deptId: number
    userName: string
    nickName: string
    email: string | null
    phonenumber: string | null
    sex: string
    avatar: string
    status: string
    loginIp: string
    loginDate: string
    roleIds: string[] | null
    postIds: string[] | null
    roleId: string[] | null
    admin: boolean
    remark: string | null
    dept: {
      deptId: number
      parentId: number
      deptName: string
      orderNum: string
      leader: string
      phone: string | null
      email: string | null
      status: string
      remark: string | null
    }
    roles: {
      roleId: number
      roleName: string
      roleKey: string
      roleSort: string
      menuCheckStrictly: boolean
      deptCheckStrictly: boolean
      status: string
      remark: string | null
    }
  }
}

/**
 * 登陆接口
 * @param data
 */
export const login = (data: LoginParams) => request.post<LoginResult>({
  url: '/login',
  params: data
})

/**
 * 验证码图片
 */
export const getCaptchaImage = () => request.get<CaptchaImageResult>({
  url: '/captchaImage'
})

/**
 * 个人信息
 */
export const getInfo = () => request.get<UserInfoResult>({
  url: '/getInfo'
})
