import { title } from '@/settings'

export const getPageTitle = pageTitle => {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
