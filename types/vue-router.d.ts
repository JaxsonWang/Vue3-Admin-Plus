import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 路由标题
    title: string
    // 在菜单隐藏路由
    hidden?: boolean
    // 在 tab 标签隐藏路由
    hideTab?: boolean
    // 路由图标
    icon?: string
    // 路由图标是否自定义图标
    isCustomSvg?: boolean
    // 在 tab 标签固定路由
    affix?: boolean
    // 禁止缓存
    noKeepAlive?: boolean
    // 权限列表
    roles?: string[]
  }
}

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  childrenNameList?: (string | undefined)[]
  props?: Recordable
  fullPath?: string
}
