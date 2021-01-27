/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：SvgIcon.spec.js
 * 创建日期：2021/1/25 下午5:07
 * 创建作者：Jaxson
 */

import { shallowMount } from '@vue/test-utils'
import SvgIcon from '@/components/SvgIcon'

describe('SvgIcon', () => {
  it('iconClass', () => {
    const iconClass = 'dashboard'
    const wrapper = shallowMount(SvgIcon, {
      props: {
        iconClass: iconClass
      }
    })
    expect(wrapper.find('use').attributes().href).toBe('#icon-dashboard')
  })
  it('className', () => {
    const wrapper = shallowMount(SvgIcon, {
      props: {
        className: 'test'
      }
    })
    expect(wrapper.classes().length).toBe(2)
    wrapper.setProps({ className: 'test' })
    expect(wrapper.classes().includes('test')).toBe(true)
  })
})
