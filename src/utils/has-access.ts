import { useUserWithOut } from '@/store/modules/user'
import { isPermission, isArray } from '@/utils/validate'

/**
 * 权限判断
 * @param value
 * @returns {boolean}
 */
export const hasAccess = (value: string[]) => {
  const useUser = useUserWithOut()
  if (useUser.admin) return true
  if (isArray(value) && value.length > 0) {
    if (value.some(i => isPermission(i))) {
      // 如果是 *:*:* 放开权限
      if (useUser.ability.some(i => i === '*:*:*')) return true
      return value.some(item => useUser.ability.includes(item))
    } else {
      return value.some(item => useUser.roles.includes(item))
    }
  } else {
    console.warn('来自 access 权限：', '请正确设置权限值')
  }
}
