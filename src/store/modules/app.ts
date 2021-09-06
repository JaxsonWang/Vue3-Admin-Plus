/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：theme.ts
 * 创建日期：2021年09月06日
 * 创建作者：Jaxson
 */

import { defineStore } from 'pinia'
import store from '@/store'
import themeConfig from '@/config/theme'
import { DeviceEnum } from '@/enums/app.enum'
import type { ThemeConfig } from '#/config'

const getLocalStore = (key: string): ThemeConfig | false => {
  const value = localStorage.getItem(key)
  if (value === null || value === undefined) return false
  return JSON.parse(value)
}

interface ThemeState {
  device: DeviceEnum
  theme: ThemeConfig
}

export const useStoreApp = defineStore({
  id: 'theme',
  state: (): ThemeState => ({
    device: DeviceEnum.DESKTOP,
    theme: getLocalStore('theme') || themeConfig
  }),
  getters: {
    getTheme(): ThemeConfig {
      return this.theme
    },
    getDevice(): string {
      return this.device
    }
  },
  actions: {
    setDevice(device: DeviceEnum): void {
      this.device = device
    }
  }
})

// 外部引入
export const useStoreAppWithOut = () => {
  return useStoreApp(store)
}
