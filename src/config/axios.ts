import type { AxiosConfig } from '#/config'
import { ContentTypeEnum } from '@/enums/http.enum'

const axiosConfig: AxiosConfig = {
  // 跨域请求时发送 cookies
  withCredentials: false,
  // 请求超时时间
  timeout: 5000,
  // 配后端数据的接收方式
  // - application/json;charset=UTF-8
  // - application/x-www-form-urlencoded;charset=UTF-8
  contentType: ContentTypeEnum.JSON,
  // 操作正常code，支持String、Array、int多种类型
  successCode: [200, 0, '200', '0'],
  // 数据状态的字段名称
  statusName: 'code',
  // 状态信息的字段名称
  messageName: 'msg'
}

export default axiosConfig
