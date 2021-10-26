/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue2-Admin-Template
 * 文件名称：validate.js
 * 创建日期：2021年08月21日
 * 创建作者：Jaxson
 */
const toString = Object.prototype.toString
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

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}
