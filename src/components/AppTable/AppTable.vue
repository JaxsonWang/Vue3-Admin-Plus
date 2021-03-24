<template>
  <div class="app-table-wrapper">
    <div class="table-header-wrapper">
      <app-form
        v-if="appConfig.tableSearch"
        :config="appConfig.tableSearch"
        :model="tableSearchModel"
        ref="tableSearchRef"
        class="app-table-search"
        @submit="onSearchSubmit"
      />
      <div class="table-header-actions">
        <slot name="header-action" :loading="loading" />
      </div>
    </div>
    <el-table
      v-loading="loading"
      v-bind="appConfig.tableAttr"
      :data="tableData"
      ref="tableRef"
      element-loading-text="加载数据中..."
      element-loading-spinner="el-icon-loading"
      @selection-change="handleSelectionChange"
    >
      <template v-for="(item, index) in appConfig.tableColumn" :key="index">
        <!--多选框-->
        <el-table-column
          v-if="item.type && item.type === 'selection'"
          :width="item.width ? item.width : null"
          :align="item.align"
          type="selection"
        />
        <!--序列号-->
        <el-table-column
          v-else-if="item.type && item.type === 'index'"
          :label="item.label"
          :width="item.width ? item.width : null"
          :align="item.align"
          :fixed="item.fixed"
          type="index"
        />
        <!--自定义列插槽-->
        <slot v-else-if="item.slot" :name="item.slot" />
        <!--表格数据渲染-->
        <el-table-column
          v-else
          :label="item.label"
          :width="item.width ? item.width : null"
          :min-width="item.minWidth ? item.minWidth : null"
          :align="item.align"
          :fixed="item.fixed"
        >
          <template v-slot="scope">
            <template v-if="item.action">
              <slot name="action-before" :scope="scope.row" />
              <template v-for="(act, idx) in item.action">
                <el-button
                  v-if="act === 'editBox'"
                  :key="idx"
                  type="text"
                  size="small"
                  @click="handleEdit(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="act === 'editRoute'"
                  :key="idx"
                  type="text"
                  size="small"
                >
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
              <slot name="action-after" :scope="scope.row" />
            </template>
            <template v-else-if="item.dateTimeFormat">{{ dayjs(scope.row[item.prop]).format(item.dateTimeFormat) }}</template>
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
  <edit-box ref="editBoxRef" />
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { merge } from 'lodash'

import EditBox from './EditBox'
import AppForm from '@/components/AppForm'
import dayjs from '@/utils/dayjs'

export default defineComponent({
  name: 'AppTable',
  components: {
    AppForm,
    EditBox
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
    const tableSearchRef = ref(null)
    const editBoxRef = ref(null)
    const appConfig = reactive(merge({
      tableAttr: {
        stripe: true,
        border: true,
        fit: true,
        highlightCurrentRow: true
      },
      tableColumn: [],
      tableListApi: null,
      tableListParams: {}, // tableListApi 所需要的参数
      tableDeleteApi: null,
      tableDeleteParams: {},
      pagination: {
        pageSizes: [10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true
      },
      tableSearch: [],
      tableSearchBtnName: {
        submit: '搜索',
        reset: '重置'
      }
    }, props.config))
    const pagination = reactive({
      currentPage: 1,
      pageCount: 1,
      pageSize: 10,
      totalCount: 1
    })
    let tableSearchModel = reactive({})

    const handleEdit = row => {
      console.log('点击的数据', row)
      editBoxRef.value.toggleVisible()
    }
    const handleDelete = row => {
      appConfig.tableDeleteApi(row.id).then(data => {
        ElMessage.success('删除成功！')
        onSearchSubmit()
      })
    }
    /**
     * 搜索条件初始化
     */
    const initSearch = () => {
      tableSearchModel = tableSearchRef.value.appModel
      onSearchSubmit()
    }
    /**
     * 获取列表数据
     */
    const getTableListData = params => {
      loading.value = true
      appConfig.tableListApi(params).then(data => {
        tableData.value = data.list
        pagination.pageCount = data.totalPage
        pagination.totalCount = data.totalCount
        loading.value = false
      })
    }
    /**
     * 搜索按钮触发
     * 所有的搜索条件都在这里触发
     */
    const onSearchSubmit = () => {
      // 搜集所有搜索条件
      const params = merge(
        appConfig.tableListParams,
        {
          currentPage: pagination.currentPage,
          pageSize: pagination.pageSize
        },
        tableSearchModel
      )
      getTableListData(params)
    }
    /**
     * 分页 - 当前页码
     * @param val
     */
    const handleCurrentChange = val => {
      // todo
      if (val !== null) {
        pagination.currentPage = val
        onSearchSubmit()
      }
    }
    /**
     * 分页 - 当前条数
     * @param val
     */
    const handleSizeChange = val => {
      pagination.pageSize = val
      onSearchSubmit()
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
     * 重置搜索
     */
    const onSearchReset = () => {
      initSearch()
    }
    /**
     * 勾选列表回调
     * @param val
     */
    const handleSelectionChange = val => {
      selectionRow.value = val
      emit('selection-change', val)
    }

    onMounted(() => {
      initSearch()
    })

    return {
      loading,
      appConfig,
      tableSearchModel,
      tableData,
      pagination,
      selectionRow,
      tableSearchRef,
      editBoxRef,
      dayjs,
      handleEdit,
      handleDelete,
      onSearchSubmit,
      handleCurrentChange,
      handleSizeChange,
      onSearchReset,
      filterVal,
      handleSelectionChange
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
