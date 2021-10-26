import { request } from '@/utils/request'
import type { Result } from '#/axios'

interface LoginParams {
  username: string
  password: string
  code: string
  uuid: string
}

interface LoginResult extends Result {
  token: string
}

interface CaptchaImageResult extends Result {
  captchaOnOff: boolean
  uuid: string
  img: string
}

export const login = (data: LoginParams) => request.post<LoginResult>({
  url: '/login',
  params: data
})

export const getCaptchaImage = () => request.get<CaptchaImageResult>({
  url: '/captchaImage'
})
