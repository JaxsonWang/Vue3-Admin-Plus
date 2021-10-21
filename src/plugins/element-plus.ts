/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：element.ts
 * 创建日期：2021年09月01日
 * 创建作者：Jaxson
 */
import type { App } from 'vue'
import ElementPlus from 'element-plus'
import type { InstallOptions } from 'element-plus/es/utils/config'

import 'element-plus/dist/index.css'

export const setupElementPlus = (app: App<Element>): void => {
  app.use(ElementPlus, {
    size: 'small'
  } as InstallOptions)
}
