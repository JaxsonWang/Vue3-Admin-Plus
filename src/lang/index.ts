/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：lang/index.js
 * 创建日期：2021/2/1 下午1:22
 * 创建作者：Jaxson
 */

import { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhCnLocale from 'element-plus/lib/locale/lang/zh-cn'
import zhCnLocale from './zh-cn'
import enLocale from './en'
import { setDayLocale } from '@/utils/dayjs'

const messages = {
  [elementEnLocale.name]: {
    // el 这个属性很关键，一定要保证有这个属性，
    el: elementEnLocale.el,
    // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
    message: enLocale
  },
  [elementZhCnLocale.name]: {
    // el 这个属性很关键，一定要保证有这个属性，
    el: elementZhCnLocale.el,
    // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
    message: zhCnLocale
  }
}

export const getLanguage = (): any => {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      Cookies.set('language', locale)
      return locale
    }
  }
  Cookies.set('language', 'en')
  return 'en'
}

// 设置 dayjs.js 本地化
setDayLocale(getLanguage())

// i18n 国际化 支持
const i18n = createI18n({
  legacy: false, // https://vue-i18n-next.intlify.dev/guide/advanced/composition.html#composition-api
  locale: getLanguage(),
  messages
})

export default i18n
