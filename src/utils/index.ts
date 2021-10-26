import config from '@/config'
import { isObject } from '@/utils/validate'

import type { App, Plugin } from 'vue'

/**
 * 安装组件
 * @param component
 * @param alias
 */
export const withInstall = <T>(component: T, alias?: string): T => {
  const temp = component as any
  temp.install = (app: App) => {
    app.component(temp.name || temp.displayName, component)
    if (alias) app.config.globalProperties[alias] = component
  }
  return component as T & Plugin
}

export const getPageTitle = (pageTitle: string): string => {
  let titleData: string = config.title
  if (pageTitle) titleData = `${pageTitle} - ${config.title}`
  if (pageTitle && config.titleReverse) titleData = `${config.title} - ${pageTitle}`
  return titleData
}

/**
 * 合并对象
 * @param src
 * @param target
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

/**
 * 对象转化 url 参数
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}
