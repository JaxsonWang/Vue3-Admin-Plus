import type { App } from 'vue'
import AppIcon from '@/components/AppIcon'

// 注册 svg 脚本
import 'virtual:svg-icons-register'
// 引入图标样式
import('@/components/AppIcon/remixicon/remixicon.css')

export const setupAppIcon = (app: App<Element>): void => {
  app.component(AppIcon.name, AppIcon)
}
