import { title } from '@/settings'

/**
 * 设置文档标题
 * @param pageTitle
 * @returns {string}
 */
export const getPageTitle = pageTitle => {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
