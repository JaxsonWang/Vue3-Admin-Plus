/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：routeAuth.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */
import { ElLoading } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import store from '@/store'
import { getPageTitle } from '@/utils'
import { getToken } from '@/utils/cookie'
import { UserActionTypes } from '@/store/modules/user/actions'

// 路由白名单
const whiteList: string[] = ['/login']

NProgress.configure({
  showSpinner: false
})

router.beforeEach(async (to, from, next) => {
  // 进度加载
  NProgress.start()
  // 设置文档标题
  document.title = getPageTitle(to.meta.title as string)
  // 获取用户 token
  const hasToken: string = getToken()
  // 判断是否有 token
  if (hasToken) {
    // 如果当前页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 获取用户信息
      const hasGetUserInfo: string = store.state.user.name
      // 如果存在跳转否则触发 store 触发器获取用户基本信息
      if (hasGetUserInfo) {
        next()
      } else {
        // 加载 Loading 服务
        const loadingInstance = ElLoading.service({
          body: true,
          fullscreen: true,
          lock: true,
          text: '正在加载用户数据'
        })
        try {
          // 获取用户信息
          const addRoutes = await store.dispatch(UserActionTypes.getInfo)
          // 添加服务器返回的路由
          for (const route of addRoutes) router.addRoute(route)
          next({ ...to, replace: true })
        } catch (error) {
          // 触发触发器并重定向到登录页
          await store.dispatch(UserActionTypes.resetToken)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        } finally {
          // 关闭 loading
          loadingInstance.close()
        }
      }
    }
  } else {
    // 是否是 路由白名单 的路由
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 重定向登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
