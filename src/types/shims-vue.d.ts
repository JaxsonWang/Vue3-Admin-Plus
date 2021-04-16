/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：shims-vue.d.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: ReturnType<typeof DefineComponent>
  export default component
}
