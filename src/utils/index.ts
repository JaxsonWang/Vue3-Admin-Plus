/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：index.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

/**
 * 设置文档标题
 * @param {string} pageTitle 设置网页标题
 * @return {string} 完整网页标题
 */
export const getPageTitle = (pageTitle: string): string => {
  const title = process.env.VUE_APP_TITLE ? process.env.VUE_APP_TITLE : '管理系统'
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return title
}

/**
 * 深度拷贝
 * @param {Object} target 对象源
 * @return {Object}
 */
export const deepClone = <T extends object>(target: T): T => {
  if (target === null) return target

  if (target instanceof Date) return new Date(target.getTime()) as T

  if (target instanceof Array) return target.map(item => deepClone(item)) as T

  if (typeof target === 'object' && target !== {}) {
    const copy = { ...target } as any
    const clone = Object.create(target)
    Object.keys(copy).forEach(key => (clone[key] = deepClone(copy[key])))
    return clone as T
  }

  return target as T
}
