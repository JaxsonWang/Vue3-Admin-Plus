import { ApiUniversal } from './Universal'

export interface LoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

export interface LoginResultModel extends ApiUniversal {
  token: string;
}
