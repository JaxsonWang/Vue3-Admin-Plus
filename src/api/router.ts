/*
 * Copyright (c) 2021, 中州软件
 * 项目名称：Vue2-Admin-Template
 * 文件名称：router.js
 * 创建日期：2021年09月10日
 * 创建作者：王瑾
 */

import request from '@/utils/request'
import type { Result } from '#/axios'
import type { AppRouteRecordRaw } from '#/vue-router'

export const getRouteList = () => request.get<Result<AppRouteRecordRaw[]>>({
  url: '/getRouters'
})
