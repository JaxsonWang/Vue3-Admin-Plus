/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：index.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

import { defineComponent, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { params, query } = route
    const { path } = params
    router
      .replace({
        path: '/' + path,
        query
      })
      .then(() => {})
  },
  render() {
    return h('div')
  }
})
