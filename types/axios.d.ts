import { AxiosRequestConfig, AxiosResponseHeaders } from 'axios'

// declare module 'axios' {
//   export interface AxiosResponse<T = unknown, D = any>  {
//     data: T
//     status: number
//     statusText: string
//     headers: AxiosResponseHeaders
//     config: AxiosRequestConfig<D>
//     request?: any
//   }
// }

export interface Result<T = any> {
  code: number
  msg: string
  data?: T
  [propName: string]: any
}

interface CodeMessageInterface {
  [key: number]: string
}
