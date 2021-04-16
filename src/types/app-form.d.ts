/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：app-form.d.ts
 * 创建日期：2021年04月16日
 * 创建作者：Jaxson
 */
import { Func, ElButton } from './el-base'

interface ElFormAttrs {
  rules: Record<string, unknown>
  inline: boolean
  labelPosition: 'right' | 'left' | 'top'
  labelWidth: string
  labelSuffix: string
  hideRequiredAsterisk: boolean
  showMessage: boolean
  inlineMessage: boolean
  statusIcon: boolean
  validateOnRuleChange: boolean
  size: 'medium' | 'small' | 'mini'
  disabled: boolean
}

interface ElFormItemAttrs {
  label: string
  labelWidth: string
  rules: object | []
  error: string
  validateStatus: string
  inlineMessage: string | boolean
  showMessage: boolean
  size: 'medium' | 'small' | 'mini'
}

interface AppButton {
  title: string
  attrs: Partial<ElButton>
}

interface Options {
  label?: string
  title?: string
  attrs?: any
  events?: any
  value?: string | number | boolean
  options?: Array<Options>
}

interface FormList {
  type:
    | 'radio'
    | 'checkbox'
    | 'input'
    | 'autocomplete'
    | 'inputNumber'
    | 'select'
    | 'cascader'
    | 'cascaderPanel'
    | 'switch'
    | 'slider'
    | 'timePicker'
    | 'timeSelect'
    | 'datePicker'
    | 'rate'
    | 'colorPicker'
    | 'transfer'
    | 'upload'
    | 'submit'
    | 'slot'
  key: string | Func
  value: unknown
  labelAttrs: Partial<ElFormItemAttrs>
  formAttrs: any
  options: Array<Options>
  isGroup: boolean
  name: string | Func
  submit: Partial<AppButton>
  reset: Partial<AppButton>
}

export declare interface AppFormConfig {
  formAttrs?: Partial<ElFormAttrs>
  formList?: Array<Partial<FormList>>
}
