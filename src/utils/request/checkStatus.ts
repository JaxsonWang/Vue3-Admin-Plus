import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserWithOut } from '@/store/modules/user'
import type { ErrorMessageMode, CodeMessageInterface } from '#/axios'

const CODE_MESSAGE: CodeMessageInterface = {
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '令牌过期',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  405: '网络请求错误，请求方法未允许',
  406: '请求格式不可得',
  408: '网络请求超时',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  501: '网络未实现',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
  505: 'HTTP 版本不支持该请求'
}

export const checkStatus = (status: number, msg: string, errorMessageMode: ErrorMessageMode = 'message'): void => {
  const userStore = useUserWithOut()
  let errMessage = ''

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      userStore.setToken(undefined)
      errMessage = msg || CODE_MESSAGE[status]
      userStore.logout()
      break
    case 402:
      errMessage = CODE_MESSAGE[status]
      break
    case 403:
      errMessage = CODE_MESSAGE[status]
      break
    case 404:
      errMessage = CODE_MESSAGE[status]
      break
    case 405:
      errMessage = CODE_MESSAGE[status]
      break
    case 406:
      errMessage = CODE_MESSAGE[status]
      break
    case 407:
      errMessage = CODE_MESSAGE[status]
      break
    case 410:
      errMessage = CODE_MESSAGE[status]
      break
    case 500:
      errMessage = CODE_MESSAGE[status]
      break
    case 501:
      errMessage = CODE_MESSAGE[status]
      break
    case 502:
      errMessage = CODE_MESSAGE[status]
      break
    case 503:
      errMessage = CODE_MESSAGE[status]
      break
    case 504:
      errMessage = CODE_MESSAGE[status]
      break
    case 505:
      errMessage = CODE_MESSAGE[status]
      break
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      ElMessageBox.alert(errMessage, '错误提示', {
        type: 'error'
      }).then()
    } else if (errorMessageMode === 'message') {
      ElMessage.error(errMessage)
    }
  }
}
