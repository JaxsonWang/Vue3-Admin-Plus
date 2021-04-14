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
