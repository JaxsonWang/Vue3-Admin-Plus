/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue2-Admin-Template
 * 文件名称：validate.js
 * 创建日期：2021年08月21日
 * 创建作者：Jaxson
 */

/**
 * 判断是否标准 url
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断是否标准 url
 * @param {string} value
 * @returns {Boolean}
 */
export const isPhoneNumber = (value: string): boolean => {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
}

/**
 * 判断是否是 element-ui 图标
 * @param {string} name
 * @returns {Boolean}
 */
export const isEleIcon = (name: string): boolean => {
  return /^el-.*/.test(name)
}

/**
 * 判断是否为 json
 * @param value
 * @returns {boolean}
 */
export const isJson = (value: string): boolean => {
  const obj = JSON.parse(value)
  return !!(typeof obj === 'object' && obj)
}

/**
 * 判断权限格式
 * @param {string} name
 * @returns {Boolean}
 */
export const isPermission = (name: string): boolean => {
  return /\S*:\S*:\S*/.test(name)
}
