/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：user.ts
 * 创建日期：2021年09月07日
 * 创建作者：Jaxson
 */

import { defineStore } from 'pinia'
import store from '@/store'
import router, { resetRouter } from '@/router'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { login, getInfo } from '@/api/login'
import { RoleEnum } from '@/enums/app.enum'
import type { LoginParams, LoginResult, UserInfoResult } from '@/api/login'

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
          this.token = response.token
          setToken(response.token)
          resolve(response)
        }).catch(error => reject(error))
      })
    },
    /**
     * 获取用户个人信息
     */
    getUserInfo(): Promise<UserInfoResult> {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const { permissions, roles, user } = response

          if (!response) {
            reject('验证失败，请重新登陆！')
          }

          this.name = user.nickName
          this.avatar = user.avatar ? user.avatar : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
          this.roles = roles
          this.admin = roles.includes(RoleEnum.ADMIN)
          this.ability = permissions
          resolve(response)
        }).catch(error => reject(error))
      })
    },
    setVirtualRoles(): void {
      this.name = '管理员'
      this.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      this.roles = ['admin']
      this.ability = ['*:*:*']
      this.admin = true
    },
    logout(): void {
      this.resetAll()
      router.push('/login').then()
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
