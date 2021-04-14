/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：validate.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
