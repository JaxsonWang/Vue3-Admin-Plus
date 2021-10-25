import { ElMessageBox, ElMessage } from 'element-plus'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import { isArray } from 'lodash'
import qs from 'qs'
import { useRouter } from 'vue-router'
import { useUser } from '@/store/modules/user'
import config from '@/config'
import { ContentTypeEnum } from '@/enums/http.enum'
import type { Result, CodeMessageInterface } from '#/axios'

const { withCredentials, timeout, contentType, successCode, statusName, messageName } = config

// 操作正常Code数组
const codeVerificationArray = isArray(successCode) ? [...successCode] : [...[successCode]]

const CODE_MESSAGE: CodeMessageInterface = {
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '令牌过期',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

const service: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API}`,
  withCredentials: withCredentials, // 跨域请求时发送 cookies
  timeout: timeout, // 请求超时时间
  headers: {
    'Content-Type': contentType
  }
})

const requestConfig = (config: AxiosRequestConfig) => {
  const { getToken } = useUser()
  if (getToken) {
    config.headers = {
      // 标准鉴权 OAuth 2.0 Bearer Token 格式如下
      Authorization: 'Bearer ' + getToken
    }
  }

  // 根据请求头传入参数进行序列化
  if (config.data && config.headers?.['Content-Type'] === ContentTypeEnum.FORM_URLENCODED) {
    config.data = qs.stringify(config.data)
  }

  // get 请求映射 params 参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?'
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName]
      const part = encodeURIComponent(propName) + '='
      if (value !== null && typeof (value) !== 'undefined') {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            if (value[key] !== null && typeof (value[key]) !== 'undefined') {
              const params = propName + '[' + key + ']'
              const subPart = encodeURIComponent(params) + '='
              url += subPart + encodeURIComponent(value[key]) + '&'
            }
          }
        } else {
          url += part + encodeURIComponent(value) + '&'
        }
      }
    }
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }

  return config
}

const responseConfig = (response: AxiosResponse<Result>): Result | Promise<string> => {
  const { config, data, status, statusText } = response
  // 若data.code存在，覆盖默认code
  let code: number = data && data[statusName] ? data[statusName] : status
  // 若code属于操作正常code，则status修改为200
  if (codeVerificationArray.indexOf(data[statusName]) + 1) code = 200
  switch (code) {
    case 200:
      // 业务层级错误处理，以下是假定restful有一套统一输出格式(指不管成功与否都有相应的数据格式)情况下进行处理
      // 例如响应内容：
      // 错误内容：{ code: 1, msg: '非法参数' }
      // 正确内容：{ code: 200, data: {  }, msg: '操作正常' }
      // return data
      return data
    case 401:
      useUser().resetAll().then(() => {
        useRouter().push({
          path: '/login',
          replace: true
        })
      })
      break
    case 403:
      useRouter().push('/403').then()
      break
    case 1001:
      ElMessageBox.confirm('登录状态已过期请重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        showConfirmButton: false,
        type: 'warning'
      }).then(() => {
        useUser().logout().then(() => {
          location.href = '/login'
        })
      })
      break
  }
  // 异常处理
  // 若data.msg存在，覆盖默认提醒消息
  const errMsg = `${
    data && data[messageName] ? data[messageName] : CODE_MESSAGE[code] ? CODE_MESSAGE[code] : statusText
  }`
  ElMessage({
    type: 'error',
    message: errMsg
  })
  return Promise.reject(data)
}

// 请求拦截器
service.interceptors.request.use(requestConfig, error => {
  // 请求错误
  console.log(error)
  return Promise.reject(error)
})

// 响应拦截器
// eslint-disable-next-line
// @ts-ignore @typescript-eslint/ban-ts-comment
service.interceptors.response.use(responseConfig, error => {
  const { response } = error
  if (response === undefined) {
    ElMessage({
      type: 'error',
      message: '未可知错误，可能是因为后端不支持跨域CORS、接口地址不存在等问题引起'
    })
    return Promise.reject(error)
  } else {
    return responseConfig(response)
  }
})

export default service
