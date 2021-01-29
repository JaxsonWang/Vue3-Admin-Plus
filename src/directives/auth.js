/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：auth.js
 * 创建日期：2021/1/29 下午10:42
 * 创建作者：Jaxson
 */

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 */
const Auth = {
  created: (el, binding, vnode) => {
    console.log(binding)
    // const actionName = binding.arg
    // const elVal = vnode.context.$route.meta.permission
    // console.log(actionName)
    // console.log(elVal)
  }
}

export default Auth
