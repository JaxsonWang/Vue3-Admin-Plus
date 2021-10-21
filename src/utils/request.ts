import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useUser } from '@/store/modules/user'

const service = axios.create({
  baseURL: `${import.meta.env.VUE_APP_BASE_API}/api`,
  withCredentials: false
})

const requestConfig = (config: AxiosRequestConfig) => {
  const { getToken } = useUser()
  // if (getToken()) {
  //   config.headers = {
  //     // 标准鉴权 OAuth 2.0 Bearer Token 格式如下
  //     Authorization: 'Bearer ' + getToken()
  //   }
  // }
  return config
}

const responseConfig = async({ config, data, status, statusText }: AxiosResponse) => {
  return Promise.reject(data)
}

service.interceptors.request.use(requestConfig, error => {
  // 请求错误
  console.log(error)
  return Promise.reject(error)
})

export default service
