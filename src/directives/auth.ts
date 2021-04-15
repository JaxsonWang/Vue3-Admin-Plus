/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：auth.ts
 * 创建日期：2021年04月14日
 * 创建作者：Jaxson
 */
import { ObjectDirective, DirectiveBinding } from 'vue'
import router from '@/router'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <el-button v-action:add >添加用户</el-button>
 *    <el-button v-action:delete>删除用户</el-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 */
const Auth: ObjectDirective = {
  mounted: (el: HTMLButtonElement, binding: DirectiveBinding) => {
    const route = router.currentRoute.value
    const authArr: any = route.meta.auth || []
    const actionName = binding.arg
    // 遍历权限颗粒是否存在，不存在则删除节点
    if (authArr.indexOf(actionName) === -1)
      (el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
  }
}

export default Auth
