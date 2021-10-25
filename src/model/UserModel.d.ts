import { ApiUniversal } from './Universal'

export interface LoginParams {
  username: string
  password: string
  code: string
  uuid: string
}

export interface LoginResultModel {
  token: string
}

export interface CaptchaImageModel {
  captchaOnOff: boolean
  uuid: string
  img: string
}
