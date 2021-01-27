/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：Redirect/index.js
 * 创建日期：2021/1/24 下午4:50
 * 创建作者：jaxson
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
    router.replace({
      path: '/' + path,
      query
    }).then(() => {})
  },
  render() {
    return h('div')
  }
})
