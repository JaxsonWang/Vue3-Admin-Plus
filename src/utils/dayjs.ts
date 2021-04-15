/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：dayjs.ts
 * 创建日期：2021年04月15日
 * 创建作者：Jaxson
 */

import dayjs from 'dayjs'

import dayjsEN from 'dayjs/locale/en'
import dayjsZhCn from 'dayjs/locale/zh-cn'

/**
 * 设置全局 Day.js 国际化对象
 * @param lang 本地化标识
 */
export const setDayLocale = (lang: string): void => {
  switch (lang) {
    case 'en':
      dayjs.locale(dayjsEN)
      break
    case 'zh-cn':
      dayjs.locale(dayjsZhCn)
      break
    default:
      dayjs.locale(dayjsEN)
  }
}

export default dayjs
