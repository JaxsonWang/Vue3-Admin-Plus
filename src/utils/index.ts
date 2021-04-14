/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：index.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

/**
 * 设置文档标题
 * @param pageTitle
 * @returns {string}
 */
export const getPageTitle = (pageTitle: string): string => {
  const title = process.env.VUE_APP_TITLE
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

export function deepClone(source: any): any {
  if (!source && typeof source !== 'object') {
    throw new Error('deepClone: error arguments')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      ;(targetObj as any)[keys] = deepClone(source[keys])
    } else {
      ;(targetObj as any)[keys] = source[keys]
    }
  })
  return targetObj
}
