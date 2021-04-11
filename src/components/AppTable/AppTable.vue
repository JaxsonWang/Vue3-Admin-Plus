<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：AppTable.vue
  - 创建日期：2021/3/31 下午2:34
  - 创建作者：Jaxson
  -->

<template>
  <div class="app-table-wrapper">
    <div class="table-header-wrapper">
      <app-form
        v-if="appConfig.header.search && Object.keys(appConfig.header.search).length !== 0"
        v-model="tableSearchModel"
        :config="appConfig.header.search"
        class="app-table-search"
        @reset="onSearchReset"
        @submit="onSearchSubmit"
      />
      <div class="table-header-actions">
        <slot name="header-action-before" :loading="loading" />
        <template v-if="appConfig.header.actions && Object.keys(appConfig.header.actions).length !== 0">
          <el-button
            v-for="(item, index) in appConfig.header.actions"
            v-bind="item.attrs"
            :key="index"
            :loading="loading"
            @click="handleHeaderAction(item)"
          >
            {{ item.title }}
          </el-button>
        </template>
        <slot name="header-action-after" :loading="loading" />
      </div>
    </div>
    <el-table
      v-loading="loading"
      v-bind="appConfig.table.attrs"
      v-on="appConfig.table.events"
      :data="tableData"
      ref="tableRef"
      element-loading-text="加载数据中..."
      element-loading-spinner="el-icon-loading"
      @selection-change="handleSelectionChange"
    >
      <template v-for="(item, index) in appConfig.table.columns" :key="index">
        <!--多选框-->
        <el-table-column v-if="item.type && item.type === 'selection'" v-bind="item" type="selection" />
        <!--序列号-->
        <el-table-column v-else-if="item.type && item.type === 'index'" v-bind="item" type="index" />
        <!--自定义列插槽-->
        <slot v-else-if="item.slot" :name="item.slot" />
        <!--表格数据渲染-->
        <el-table-column v-else v-bind="item">
          <template v-slot="scope">
            <template v-if="item.action">
              <slot name="action-before" :row="scope.row" :column="scope.column" :$index="scope.$index" />
              <template v-for="(act, idx) in item.action">
                <el-button v-if="act === 'editBox'" :key="idx" type="text" size="small" @click="handleEdit(scope.row)">
                  编辑
                </el-button>
                <el-button v-if="act === 'editRoute'" :key="idx" type="text" size="small">
                  <router-link to="https://baidu.com">编辑</router-link>
                </el-button>
                <el-popconfirm
                  v-if="act === 'delete'"
                  :key="idx"
                  title="这是一段内容确定删除吗？"
                  @confirm="handleDelete(scope.row)"
                >
                  <template #reference>
                    <el-button type="text" size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
              <slot name="action-after" :row="scope.row" :column="scope.column" :$index="scope.$index" />
            </template>
            <template v-else-if="item.dateTimeFormat">
              {{ dayjs(scope.row[item.prop]).format(item.dateTimeFormat) }}
            </template>
            <template v-else>{{ filterVal(scope.row[item.prop]) }}</template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-bind="appConfig.pagination"
      :current-page="pagination.currentPage"
      :page-count="pagination.pageCount"
      :page-size="pagination.pageSize"
      :total="pagination.totalCount"
      :disabled="loading"
      class="app-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <el-dialog
    v-if="appConfig.editBox"
    v-model="editBox.visible"
    v-bind="appConfig.editBox.dialogAttrs"
    v-on="appConfig.editBox.dialogEvents"
    :title="editBox.title"
  >
    <app-form v-model="editBox.row" :config="appConfig.editBox.form" ref="editBoxFormRef" />
    <template v-if="appConfig.editBox.footer" #footer>
      <div class="dialog-footer">
        <slot name="dialog-footer-before" :model="editBox.row" />
        <template v-for="(action, index) in appConfig.editBox.footer" :key="index">
          <el-button v-bind="action.attrs" @click="handleBox(action.action)">
            {{ action.title }}
          </el-button>
        </template>
        <slot name="dialog-footer-after" :model="editBox.row" />
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, reactive, onBeforeMount } from 'vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { merge } from 'lodash'

import AppForm from '@/components/AppForm'
import dayjs from '@/utils/dayjs'

export default defineComponent({
  name: 'AppTable',
  components: {
    AppForm
  },
  props: {
    config: {
      require: true,
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const loading = ref(false)
    const tableData = ref([])
    const selectionRow = ref([])
    const tableSearchModel = ref({})
    const editBoxFormRef = ref(null)
    const editBox = reactive({
      title: '',
      type: 'add',
      visible: false,
      row: {}
    })
    const appConfig = reactive(
      merge(
        {
          header: {
            search: {},
            actions: {}
          },
          table: {
            attrs: {
              stripe: true,
              border: true,
              fit: true,
              highlightCurrentRow: true
            },
            events: {},
            columns: [],
            api: {
              list: null,
              delete: null
            }
          },
          pagination: {
            pageSizes: [10, 20, 30, 40, 50, 100],
            layout: 'total, sizes, prev, pager, next, jumper',
            background: true
          },
          editBox: {
            api: {
              add: null,
              update: null
            },
            title: '',
            dialogAttrs: {
              width: '960px'
            },
            dialogEvents: {},
            form: {
              formAttrs: {},
              formList: []
            },
            footer: [
              {
                action: 'cancel',
                title: '取消',
                attrs: {
                  size: 'small'
                }
              },
              {
                action: 'confirm',
                title: '确定',
                attrs: {
                  type: 'primary',
                  size: 'small'
                }
              }
            ]
          }
        },
        props.config
      )
    )
    const pagination = reactive({
      currentPage: 1,
      pageCount: 1,
      pageSize: appConfig.pagination.pageSizes[0],
      totalCount: 1
    })
    /**
     * 搜索按钮触发
     * 所有的搜索条件都在这里触发
     */
    const getTableList = searchModel => {
      // 搜集所有搜索条件
      const params = merge(
        {
          currentPage: pagination.currentPage,
          pageSize: pagination.pageSize
        },
        searchModel
      )
      getTableListData(params)
    }
    /**
     * 获取列表数据
     */
    const getTableListData = params => {
      loading.value = true
      appConfig.table.api.list(params).then(data => {
        tableData.value = data.list
        pagination.pageCount = data.totalPage
        pagination.totalCount = data.totalCount
        loading.value = false
      })
    }
    /**
     * 重置搜索
     */
    const onSearchReset = () => {
      pagination.currentPage = 1
      pagination.pageSize = appConfig.pagination.pageSizes[0]
      getTableList()
    }
    /**
     * 提交搜索
     */
    const onSearchSubmit = () => {
      pagination.currentPage = 1
      pagination.pageSize = appConfig.pagination.pageSizes[0]
      getTableList(tableSearchModel.value)
    }
    /**
     * 分页 - 当前页码
     * @param val
     */
    const handleCurrentChange = val => {
      pagination.currentPage = val
      getTableList()
    }
    /**
     * 分页 - 当前条数
     * @param val
     */
    const handleSizeChange = val => {
      pagination.pageSize = val
      getTableList()
    }
    /**
     * 过滤值
     * @param val
     * @returns {string|*}
     */
    const filterVal = val => {
      if (val === null || val === '' || val === undefined) {
        return '-'
      } else {
        return val
      }
    }
    /**
     * 勾选列表回调
     * @param val
     */
    const handleSelectionChange = val => {
      selectionRow.value = val
      emit('selection-change', val)
    }
    /**
     * 页头按钮事件
     * @param row
     */
    const handleHeaderAction = row => {
      switch (row.action) {
        case 'add':
          if (row.event) {
            emit(row.event, selectionRow.value)
          } else {
            if (row.type === 'editBox') {
              handleEdit()
            } else if (row.type === 'editRoute') {
              console.log('跳转到新建页面')
            }
          }
          break
        case 'delete':
          if (row.event) {
            emit(row.event, selectionRow.value)
          } else {
            if (selectionRow.value.length === 0) {
              ElNotification({
                title: '操作失败',
                message: '请选择数据再进行操作！',
                type: 'warning'
              })
              return
            }
            ElMessageBox.confirm('此操作将会永久删除数据，是否继续？', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                row.api(selectionRow.value).then(() => {
                  getTableList()
                })
              })
              .catch(() => {
                ElMessage.info('取消操作！')
              })
          }
          break
        default:
          emit(row.event, selectionRow.value)
      }
    }
    /**
     * EditBox 弹窗提交事件
     */
    const handleBox = type => {
      if (type === 'confirm') {
        editBoxFormRef.value
          .formValidate()
          .then(() => {
            if (editBox.type === 'add') {
              appConfig.editBox.api.add(editBox.row).then(response => {
                ElMessage.success('新建成功')
                getTableList()
                editBox.visible = false
              })
            }
            if (editBox.type === 'edit') {
              appConfig.editBox.api.update(editBox.row).then(response => {
                ElMessage.success('更新成功')
                getTableList()
                editBox.visible = false
              })
            }
          })
          .catch(validError => {
            ElMessage.error(validError)
          })
      }
      if (type === 'cancel') editBox.visible = false
    }
    /**
     * Edit Box 打开
     */
    const handleEdit = row => {
      if (row) {
        editBox.row = row
        editBox.title = '编辑' + appConfig.editBox.title
        editBox.type = 'edit'
      } else {
        // 清空数据
        editBox.row = {}
        editBox.title = '新建' + appConfig.editBox.title
        editBox.type = 'add'
      }
      editBox.visible = true
    }
    /**
     * 删除
     */
    const handleDelete = row => {
      appConfig.table.api.delete(row).then(response => {
        ElMessage.success('删除成功！')
        getTableList()
      })
    }

    onBeforeMount(() => {
      getTableList()
    })

    return {
      loading,
      appConfig,
      tableData,
      pagination,
      selectionRow,
      tableSearchModel,
      editBox,
      editBoxFormRef,
      dayjs,
      onSearchSubmit,
      onSearchReset,
      handleEdit,
      handleDelete,
      handleCurrentChange,
      handleSizeChange,
      handleSelectionChange,
      handleHeaderAction,
      handleBox,
      filterVal,
      getTableList
    }
  }
})
</script>

<style lang="scss" scoped>
.app-table-wrapper {
  width: 100%;
  .table-header-wrapper {
    display: flex;
    justify-content: space-between;
    .app-table-search {
      :deep .el-form-item:last-child {
        margin-right: 0;
      }
    }
  }
  .app-pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
