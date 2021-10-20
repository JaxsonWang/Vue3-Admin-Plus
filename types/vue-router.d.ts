import 'vue-router'

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
  }
}
