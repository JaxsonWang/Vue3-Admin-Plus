<template>
  <div class="app-table-wrapper">
    <el-form
      v-if="appConfig.tableSearch.length !== 0"
      :inline="true"
      :model="tableSearchModel"
      ref="tableSearchRef"
      size="small"
      class="app-table-search"
    >
      <el-form-item
        v-for="(item, index) in appConfig.tableSearch"
        :key="index"
        :label="item.label"
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'text'"
          v-model="tableSearchModel[item.key]"
          :type="item.type"
          :name="item.key"
          :placeholder="item.placeholder"
          :clearable="item.clearable"
          :class="item.class"
          :disabled="loading"
        />
        <!-- 日期时间选择器 -->
        <el-date-picker
          v-if="item.type === 'daterange'"
          v-model="tableSearchModel[item.key]"
          :align="item.align"
          :range-separator="item.rangeSeparator || '至'"
          :start-placeholder="item.startPlaceholder || '开始时间'"
          :end-placeholder="item.endPlaceholder || '结束时间'"
          :name="item.key"
          :picker-options="item.pickerOptions"
          :class="item.class"
          :disabled="loading"
          type="daterange"
        />
        <!-- 日期选择器 -->
        <el-date-picker
          v-if="item.type === 'date'"
          v-model="tableSearchModel[item.key]"
          :name="item.key"
          :value-format="item.format"
          :placeholder="item.placeholder"
          :class="item.class"
          :disabled="loading"
          type="date"
        />
        <!-- 下拉框 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="tableSearchModel[item.key]"
          :name="item.key"
          :placeholder="item.placeholder"
          :clearable="item.clearable"
          :class="item.class"
          :disabled="loading"
        >
          <el-option
            v-for="(option, indexItem) in item.options"
            :key="indexItem"
            :label="option.label"
            :value="option.value"
            :disabled="loading"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click="onSearchSubmit"
        >
          {{ appConfig.tableSearchSubmitName }}
        </el-button>
        <el-button
          v-if="appConfig.tableSearchResetName"
          :loading="loading"
          type="primary"
          @click="onSearchReset"
        >
          {{ appConfig.tableSearchResetName }}
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      v-bind="appConfig.tableAttr"
      :data="tableData"
      element-loading-text="加载数据中..."
      element-loading-spinner="el-icon-loading"
    >
      <template v-for="(item, index) in appConfig.tableColumn">
        <!--多选框-->
        <el-table-column
          v-if="item.type && item.type === 'selection'"
          :width="item.width"
          :align="item.align"
          :key="index"
          type="selection"
        />
        <!--序列号-->
        <el-table-column
          v-else-if="item.type && item.type === 'index'"
          :width="item.width"
          :align="item.align"
          :fixed="item.fixed"
          :label="item.label"
          :key="index"
          type="index"
        />
        <!--自定义列插槽-->
        <slot v-else-if="item.slot" :name="item.slot" />
        <!--表格数据渲染-->
        <el-table-column
          v-else
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :align="item.align"
          :fixed="item.fixed"
          :key="index"
        >
          <template v-slot="scope">
            <template v-if="item.isImage">
              <el-image
                v-if="item.isImage"
                style="width: 100px; height: 100px; margin-top: 10px;"
                lazy
                fit="cover"
                :src="scope.row[item.prop]"
                :preview-src-list="[scope.row[item.prop]]"
              />
            </template>
            <template v-else-if="item.action">
              <slot name="action-before" :scope="scope.row" />
              <template v-for="(act, idx) in item.action">
                <el-button
                  v-if="act === 'edit'"
                  :key="idx"
                  type="text"
                  size="small"
                  @click="handleEdit(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="act === 'delete'"
                  :key="idx"
                  type="text"
                  size="small"
                  @click="handleDelete(scope.row)"
                >
                  删除
                </el-button>
              </template>
              <slot name="action-after" :scope="scope.row" />
            </template>
            <template v-else>{{ filterVal(scope.row[item.prop]) }}</template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      :current-page="pagination.currentPage"
      :page-count="pagination.pageCount"
      :page-size="pagination.pageSize"
      :page-sizes="appConfig.pagination.pageSizes"
      :layout="appConfig.pagination.layout"
      :background="appConfig.pagination.background"
      :disabled="loading"
      class="app-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'AppTable',
  props: {
    config: {
      require: true,
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const loading = ref(false)
    const appConfig = reactive(Object.assign({}, {
      tableAttr: {
        stripe: true,
        border: true,
        fit: true
      },
      tableColumn: [],
      tableListApi: null,
      tableListParams: {}, // tableListApi 所需要的参数
      tableDelApi: null,
      pagination: {
        pageSizes: [10, 20, 30, 40, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true
      },
      tableSearch: [],
      tableSearchSubmitName: '提交',
      tableSearchResetName: '重置'
    }, props.config))
    const tableSearchModel = reactive({})
    const tableData = reactive([])
    const pagination = reactive({
      currentPage: 1,
      pageCount: 1,
      pageSize: 10
    })

    const handleEdit = () => {}
    const handleDelete = () => {}
    /**
     * 搜索条件初始化
     */
    const initSearch = () => {
      appConfig.tableSearch.forEach(item => {
        if (item.value !== undefined) tableSearchModel[item.key] = item.value
      })
    }
    /**
     * 获取列表数据
     */
    const getTableListData = params => {
      loading.value = true
      appConfig.tableListApi(params).then(response => {
        tableData.value = response.DataList
        loading.value = false
      })
    }
    /**
     * 搜索按钮触发
     * 所有的搜索条件都在这里触发
     */
    const onSearchSubmit = () => {
      // 搜集所有搜索条件
      const params = Object.assign(
        {},
        appConfig.tableListParams,
        {
          pageNum: pagination.currentPage,
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
      pagination.currentPage = val
      onSearchSubmit()
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

    initSearch()
    onSearchSubmit()

    return {
      loading,
      appConfig,
      tableSearchModel,
      tableData,
      pagination,
      handleEdit,
      handleDelete,
      onSearchSubmit,
      handleCurrentChange,
      handleSizeChange,
      onSearchReset,
      filterVal
    }
  }
})
</script>

<style lang="scss" scoped>
.app-table-wrapper {
  width: 100%;
  .app-pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
