import type { App, Plugin } from 'vue'

export const withInstall = <T>(component: T, alias?: string): T => {
  const temp = component as any
  temp.install = (app: App) => {
    app.component(temp.name || temp.displayName, component)
    if (alias) app.config.globalProperties[alias] = component
  }
  return component as T & Plugin
}
