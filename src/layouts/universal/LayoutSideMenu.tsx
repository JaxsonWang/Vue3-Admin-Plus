/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：LayoutSideMenu.tsx
 * 创建日期：2021年09月08日
 * 创建作者：Jaxson
 */

import { defineComponent, toRaw } from 'vue'
import { useRoutes } from '@/store/modules/routes'
import AppIcon from '@/components/AppIcon'

import type { RouteMeta } from 'vue-router'
import type { AppRouteRecordRaw } from '#/vue-router'

export default defineComponent({
  render: () => {
    const { routes } = useRoutes()
    /**
     * 获取路由信息
     */
    const getRoutes = toRaw(routes)
    /**
     * 菜单名称显示
     * @param meta
     */
    const menuName = (meta: RouteMeta) => {
      if (meta.icon) {
        return <>
          <AppIcon icon={meta.icon} size="28" class="menu-icon" /> {meta.title}
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
          <el-sub-menu v-slots={{
            title: () => menuName(menu.meta)
          }} index={menu.path}>
            {menuList(menu.children)}
          </el-sub-menu>
        </>
      } else {
        return <el-menu-item index={menu.path} route={menu}>{menuName(menu.meta)}</el-menu-item>
      }
    })
    return (
      <>
        <el-scrollbar height={'100vh'} wrap-class="side-menu-scrollbar">
          <el-menu router={true} class="border-none">
            {
              menuList(getRoutes)
            }
          </el-menu>
        </el-scrollbar>
      </>
    )
  }
})
