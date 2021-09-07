import config from '@/config'
import type { App, Plugin } from 'vue'

/**
 * 安装组件
 * @param component
 * @param alias
 */
export const withInstall = <T>(component: T, alias?: string): T => {
  const temp = component as any
  temp.install = (app: App) => {
    app.component(temp.name || temp.displayName, component)
    if (alias) app.config.globalProperties[alias] = component
  }
  return component as T & Plugin
}

export const getPageTitle = (pageTitle: string): string => {
  let titleData: string = config.title
  if (pageTitle) titleData = `${pageTitle} - ${config.title}`
  if (pageTitle && config.titleReverse) titleData = `${config.title} - ${pageTitle}`
  return titleData
}
