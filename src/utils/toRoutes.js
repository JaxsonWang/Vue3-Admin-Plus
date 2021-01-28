/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：toRoutes.js
 * 创建日期：2021/1/27 下午4:24
 * 创建作者：Jaxson
 */
import DefaultLayout from '@/layout/default'

export const dataToRoutes = data => {
  return data.map(item => {
    const tmp = { ...item }
    // 实例化路径
    if (tmp.component === 'layout/default') {
      tmp.component = DefaultLayout
    } else {
      const subView = tmp.component
      tmp.component = () => Promise.resolve(require(`@/views/${subView}`).default)
    }
    if (tmp.children) {
      tmp.children = dataToRoutes(tmp.children)
    }
    return tmp
  })
}
