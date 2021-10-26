export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface RequestOptions {
  // 将请求参数拼接到url
  joinParamsToUrl?: boolean
  // 格式请求参数时间
  formatDate?: boolean
  // 是否处理请求结果
  isTransformResponse?: boolean
  // 是否返回本机响应头
  // 例如: 当您需要获取响应头时，请使用此属性
  isReturnNativeResponse?: boolean
  // 是否加入url
  joinPrefix?: boolean
  // 接口地址，如果将其留空，则使用默认的apiUrl
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // 错误信息提示类型
  errorMessageMode?: ErrorMessageMode
  // 是否添加时间戳
  joinTime?: boolean
  ignoreCancelToken?: boolean
  // 是否在标头中发送令牌
  withToken?: boolean
}

export interface Result<T = any> {
  code: number
  msg: string
  data?: T
  [propName: string]: any
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}

export interface CodeMessageInterface {
  [key: number]: string
}
