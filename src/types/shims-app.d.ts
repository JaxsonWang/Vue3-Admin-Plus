/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：shims-app.d.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
