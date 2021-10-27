/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：user.ts
 * 创建日期：2021年09月07日
 * 创建作者：Jaxson
 */

import { defineStore } from 'pinia'
import store from '@/store'
import { resetRouter } from '@/router'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { login } from '@/api/login'

import type { LoginParams, LoginResult } from '@/api/login'

interface UserState {
  name: string
  token: string | undefined
  avatar: string
  roles: string[]
  ability: string[]
  admin: boolean
}

export const useUser = defineStore({
  id: 'user',
  state: (): UserState => ({
    name: '',
    token: getToken(),
    avatar: '',
    roles: ['admin'],
    ability: ['*:*:*'],
    admin: false
  }),
  getters: {
  },
  actions: {
    /**
     * 设置 roles 权限列表
     */
    setRoles(roles: string[]): void {
      this.roles = roles
    },
    /**
     * 设置 ability 权限列表
     */
    setAbility(ability: string[]): void {
      this.ability = ability
    },
    /**
     * 设置 token 信息
     */
    setToken(token: string | undefined): void {
      this.token = token
    },
    /**
     * 设置管理员
     * @param isAdmin
     */
    setFull(isAdmin: boolean): void {
      this.admin = isAdmin
    },
    /**
     * 登陆请求
     * @param userInfo
     */
    login(userInfo: LoginParams): Promise<LoginResult> {
      const { username, password, code, uuid } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          code,
          uuid
        }).then(response => {
          this.setToken(response.token)
          setToken(response.token)
          resolve(response)
        }).catch(error => reject(error))
      })
    },
    /**
     * 获取用户个人信息
     */
    getUserInfo(): void {
      this.name = '管理员'
      this.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      this.setRoles(['admin'])
      this.setAbility(['*:*:*'])
    },
    setVirtualRoles(): void {
      this.name = '管理员'
      this.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      this.setRoles(['admin'])
      this.setAbility(['*:*:*'])
      this.admin = true
    },
    logout(): void {
      this.resetAll()
    },
    /**
     * 重置信息
     */
    resetAll(): Promise<void> {
      return new Promise(resolve => {
        this.name = ''
        this.token = ''
        this.avatar = ''
        this.roles = []
        this.ability = []
        this.admin = false
        removeToken()
        resetRouter()
        resolve()
      })
    }
  }
})

// 外部引入
export const useUserWithOut = () => {
  return useUser(store)
}
