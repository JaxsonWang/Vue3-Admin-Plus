/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：toRoutes.js
 * 创建日期：2021/1/27 下午4:24
 * 创建作者：jaxson
 */
const dataToRoutes = data => {
  const res = []
  data.forEach(item => {
    const tmp = { ...item }
    // 实例化路径 如果 layout 开头 则是布局组件
    if (/^layout\//g.test(tmp.component)) {
      tmp.component = () => Promise.resolve(require(`@/${tmp.component}`).default)
    } else {
      tmp.component = () => Promise.resolve(require(`@/views/${tmp.component}`).default)
    }
    if (tmp.children) {
      tmp.children = dataToRoutes(tmp.children)
    }
    res.push(tmp)
  })
  return res
}

export default dataToRoutes
