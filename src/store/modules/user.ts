/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：user.ts
 * 创建日期：2021年09月07日
 * 创建作者：Jaxson
 */

import { defineStore } from 'pinia'
import store from '@/store'
import { login } from '@/api/login'
import { resetRouter } from '@/router'
import { getToken, removeToken } from '@/utils/auth'

import type { LoginParams, LoginResultModel } from '@/model/UserModel'

interface UserState {
  name: string
  token: string | undefined
  avatar: string
  roles: Array<string>
  ability: Array<string>
  full: boolean
}

export const useUser = defineStore({
  id: 'user',
  state: (): UserState => ({
    name: '',
    token: getToken(),
    avatar: '',
    roles: [],
    ability: [],
    full: false
  }),
  getters: {
    getName(): string {
      return this.name
    },
    getToken(): string | undefined {
      return this.token
    }
  },
  actions: {
    /**
     * 设置 roles 权限列表
     */
    setRoles(): void {
      this.roles = ['admin']
    },
    /**
     * 设置 ability 权限列表
     */
    setAbility(): void {
      this.ability = ['*:*:*']
    },
    /**
     * 设置 token 信息
     */
    setToken(): void {
      this.token = 'xxxxxxxxxxxxx'
    },
    setFull(isFull: boolean): void {
      this.full = isFull
    },
    /**
     * 登陆请求
     * @param userInfo
     */
    login(userInfo: LoginParams): Promise<LoginResultModel | null> {
      const { username, password, code, uuid } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username: username.trim(),
          password,
          code,
          uuid
        }).then(response => {
          // const { token } = response
        })
      })
    },
    /**
     * 获取用户个人信息
     */
    getUserInfo(): void {
      this.name = '管理员'
      this.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      this.setRoles()
      this.setAbility()
    },
    /**
     * 重置信息
     */
    resetAll(): void {
      this.name = ''
      this.token = ''
      this.avatar = ''
      this.roles = []
      this.ability = []
      this.full = false
      removeToken()
      resetRouter()
    }
  }
})

// 外部引入
export const useUserWithOut = () => {
  return useUser(store)
}
