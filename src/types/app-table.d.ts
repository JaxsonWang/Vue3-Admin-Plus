/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：app-table.d.ts
 * 创建日期：2021年04月16日
 * 创建作者：Jaxson
 */
import { TableProps, TableColumnCtx } from 'element-plus/packages/table/src/table.type'
import { ElButton } from './el-base'
import { AppFormConfig } from './app-form'

interface DialogAttributes {
  appendToBody: boolean
  destroyOnClose: boolean
  center: boolean
  customClass: string
  closeOnClickModal: boolean
  closeOnPressEscape: boolean
  fullscreen: boolean
  lockScroll: boolean
  showClose: boolean
  title: string
  openDelay: number
  closeDelay: number
  top: string
  modal: boolean
  width: string | number
  beforeClose: (close: (shouldCancel: boolean) => void) => void
}

interface DialogEvents {
  open: () => void
  opened: () => void
  close: () => void
  closed: () => void
}

interface ElTableColumns extends Partial<TableColumnCtx> {
  slot?: string
  dateTimeFormat?: string
  action?: Array<'editBox' | 'delete'>
}

interface ElTableConfig {
  attrs?: Partial<TableProps>
  events?: {
    select?: (selection, row) => void
    selectAll?: (selection) => void
    selectionChange?: (selection) => void
    cellMouseEnter?: (row, column, cell, event) => void
    cellMouseLeave?: (row, column, cell, event) => void
    cellClick?: (row, column, cell, event) => void
    cellDblClick?: (row, column, cell, event) => void
    rowClick?: (row, column, event) => void
    rowContextmenu?: (row, column, event) => void
    rowDblclick?: (row, column, event) => void
    headerClick?: (column, event) => void
    headerContextmenu?: (column, event) => void
    sortChange?: ({ column, prop, order }) => void
    filterChange?: (filters) => void
    currentChange?: (currentRow, oldCurrentRow) => void
    headerDragend?: (newWidth, oldWidth, column, event) => void
    expandChange?: (row, expandedRows) => void
  }
  columns?: Array<Partial<ElTableColumns>>
  api: {
    list: (params: any) => Promise<any>
    delete: (row: any) => Promise<any>
  }
}

interface ElPagination {
  small: boolean
  total: number
  pagerCount: number
  layout: Record<string, string | undefined>
  pageSizes: Array<number>
  popperClass: string
  prevText: string
  nextText: string
  background: boolean
  hideOnSinglePage: boolean
}

interface EditBoxFooterBtn {
  action?: 'cancel' | 'primary'
  title?: string
  attrs?: Partial<ElButton>
}

interface HeaderSearchActions {
  action?: 'add' | 'delete'
  title?: string
  attrs?: Partial<ElButton>
  api?: (row: any) => Promise<any>
  type?: 'editBox' | 'editRoute'
}

export declare interface AppTableConfig {
  header?: {
    search?: Partial<AppFormConfig>
    actions?: Array<HeaderSearchActions>
  }
  table: ElTableConfig
  pagination?: Partial<ElPagination>
  editBox?: {
    api: {
      add: (data: any) => Promise<any>
      update: (data: any) => Promise<any>
    }
    title?: string
    dialogAttrs?: Partial<DialogAttributes>
    dialogEvents?: Partial<DialogEvents>
    form?: Partial<AppFormConfig>
    footer?: Array<EditBoxFooterBtn>
  }
}
