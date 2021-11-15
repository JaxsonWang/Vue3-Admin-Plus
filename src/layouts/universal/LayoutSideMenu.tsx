/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：LayoutSideMenu.tsx
 * 创建日期：2021年09月08日
 * 创建作者：Jaxson
 */

import { defineComponent, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { ElScrollbar, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { useApp } from '@/store/modules/app'
import { useRoutes } from '@/store/modules/routes'
import AppIcon from '@/components/AppIcon'

import type { RouteMeta } from 'vue-router'
import type { AppRouteRecordRaw } from '#/vue-router'

export default defineComponent({
  render: () => {
    const route = useRoute()
    const { theme, sidebarCollapse } = useApp()
    const { routes } = useRoutes()
    /**
     * 获取路由信息
     */
    const getRoutes = toRaw(routes)
    /**
     * 当前路由路径
     */
    const currentPath = route.path
    /**
     * 菜单名称显示
     * @param meta
     */
    const menuName = (meta: RouteMeta) => {
      if (meta.icon) {
        return <>
          <AppIcon icon={meta.icon} size="28" class="menu-icon" /> <span>{meta.title}</span>
        </>
      } else {
        return meta.title
      }
    }
    /**
     * 菜单列表
     * @param menus
     */
    const menuList = (menus: AppRouteRecordRaw[]) => menus.map(menu => {
      if (menu.meta && menu.meta.hidden) return
      if (menu.children) {
        return <>
          <ElSubMenu
            v-slots={{
              title: () => menuName(menu.meta)
            }}
            index={menu.path}
          >
            {menuList(menu.children)}
          </ElSubMenu>
        </>
      } else {
        return <ElMenuItem index={menu.path} route={menu}>{menuName(menu.meta)}</ElMenuItem>
      }
    })
    return (
      <>
        <ElScrollbar
          viewClass="side-menu-view"
          wrapClass="side-menu-wrap"
          class="side-menu-scrollbar-wrapper"
        >
          <ElMenu
            defaultActive={currentPath}
            collapse={!sidebarCollapse}
            backgroundColor={theme.menuBackgroundColor}
            textColor={theme.menuTextColor}
            activeTextColor={theme.menuActiveTextColor}
            router
            uniqueOpened
            class="side-menu border-none"
          >
            {menuList(getRoutes)}
          </ElMenu>
        </ElScrollbar>
      </>
    )
  }
})
