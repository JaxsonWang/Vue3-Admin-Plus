import * as elementPlusIcons from '@element-plus/icons'

import type { App } from 'vue'

export const setupElementPlusIcons = (app: App<Element>): void => {
  Object.keys(elementPlusIcons).forEach((icon: string) => {
    // @ts-ignore
    const iconRender = elementPlusIcons[icon]
    app.component(icon, iconRender)
  })
}
