/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：auth.js
 * 创建日期：2021/1/29 下午10:42
 * 创建作者：Jaxson
 */
import store from '@/store'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <el-button v-action:add >添加用户</el-button>
 *    <el-button v-action:delete>删除用户</el-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 */
export const Auth = {
  mounted: (el, binding) => {
    // 从 store 获取当前路由 auth 数组对象
    const authArr = store.getters.currentRoute.meta.auth ? store.getters.currentRoute.meta.auth : []
    const actionName = binding.arg
    // 遍历权限颗粒是否存在，不存在则删除节点
    if (authArr.indexOf(actionName) === -1) {
      (el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
    }
  }
}

