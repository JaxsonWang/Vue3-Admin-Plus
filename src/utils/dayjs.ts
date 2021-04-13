/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：dayjs.js
 * 创建日期：2021/2/1 下午4:04
 * 创建作者：Jaxson
 */

import dayjs from 'dayjs'

import dayjsEN from 'dayjs/locale/en'
import dayjsZhCn from 'dayjs/locale/zh-cn'

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
