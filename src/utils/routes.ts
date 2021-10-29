import qs from 'qs'
import resolve from '@/utils/path-resolve'
import { hasAccess } from '@/utils/has-access'
import { isExternal } from '@/utils/validate'
import configs from '@/configs'

import type { RouteLocationNormalized } from 'vue-router'
import type { AppRouteRecordRaw } from '#/vue-router'

const { recordRoute } = configs

/**
 * all模式渲染后端返回路由,支持包含views路径的所有页面
 * @param asyncRoutes
 * @returns {*}
 */
export const convertRouter = (asyncRoutes: AppRouteRecordRaw[]) => {
  return asyncRoutes.map((route: AppRouteRecordRaw) => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = () => Promise.resolve(require('@/layout').default)
      } else {
        const index = route.component.indexOf('views')
        const path = index > 0 ? route.component.slice(index) : `views/${route.component}`
        route.component = () => Promise.resolve(require(`@/${path}`).default)
      }
    }
    if (route.children && route.children.length) route.children = convertRouter(route.children)
    if (route.children && route.children.length === 0) delete route.children
    return route
  })
}

/**
 * 根据roles数组拦截路由
 * @param routes 路由
 * @param rolesControl 是否进行权限控制
 * @param baseUrl 基础路由
 * @returns {[]}
 */
export const filterRoutes = (routes: AppRouteRecordRaw[], rolesControl: boolean, baseUrl = '/') => {
  return routes.filter(route => rolesControl && route.meta && route.meta.roles ? hasAccess(route.meta.roles) : true).map(route => {
    route = { ...route }
    route.path = route.path !== '/:pathMatch(.*)*' && !isExternal(route.path) ? resolve(baseUrl, route.path) : route.path
    if (route.children) {
      route.children = filterRoutes(route.children, rolesControl, route.path)
      route.childrenNameList = route.children.flatMap(_ => _.childrenNameList)
      if (!route.redirect) route.redirect = route.children[0].redirect ? route.children[0].redirect : route.children[0].path
    } else route.childrenNameList = [route.name]
    return route
  })
}

/**
 * 根据 name 获取 matched
 * @param routes 菜单routes
 * @param name 路由名
 * @returns {*} matched
 */
export const handleMatched = (routes: AppRouteRecordRaw[], name: string): AppRouteRecordRaw[] => {
  return routes.filter(route => route.childrenNameList ? route.childrenNameList.indexOf(name) + 1 : false).flatMap(route => route.children ? [route, ...handleMatched(route.children, name)] : [route])
}

/**
 * 生成单个多标签元素，可用于同步/异步添加多标签
 * @param tag route页信息
 * @param init 是否是从router获取路由
 */
export const handleTabs = (tag: RouteLocationNormalized, init = false) => {
  let parentIcon = null
  if (tag.matched) {
    for (let i = tag.matched.length - 2; i >= 0; i--) {
      if (!parentIcon && tag.matched[i].meta.icon) parentIcon = tag.matched[i].meta.icon
    }
  }
  if (!parentIcon) parentIcon = 'ri-menu-line'
  const path = handleActivePath(tag, true)
  if (tag.name && tag.meta && tag.meta.tabHidden !== true) {
    return {
      path: path,
      query: tag.query,
      params: tag.params,
      name: tag.name,
      matched: init ? [tag.name] : tag.matched.map(route => route.components.default.name),
      parentIcon,
      meta: { ...tag.meta }
    }
  }
}

/**
 * 根据当前route获取激活菜单
 * @param route 当前路由
 * @param isTab 是否是标签
 * @returns {string|*}
 */
export const handleActivePath = (route: RouteLocationNormalized, isTab = false) => {
  const { meta, path } = route
  const rawPath = route.matched ? route.matched[route.matched.length - 1].path : path
  const fullPath = route.query && Object.keys(route.query).length ? `${route.path}&${qs.stringify(route.query)}` : route.path
  if (isTab) return meta.dynamicNewTab ? fullPath : rawPath
  if (meta.activeMenu) return meta.activeMenu
  return fullPath
}

/**
 * 获取当前跳转登录页的Route
 * @param currentPath 当前页面地址
 */
export const toLoginRoute = (currentPath: string) => {
  if (recordRoute && currentPath !== '/') {
    return {
      path: '/login',
      query: {
        redirect: currentPath
      },
      replace: true
    }
  } else {
    return { path: '/login', replace: true }
  }
}
