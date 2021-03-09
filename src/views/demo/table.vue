<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：demo.vue
  - 创建日期：2021/2/18 下午2:50
  - 创建作者：Jaxson
  -->

<template>
  <div class="table-demo-container">
    <app-table
      :config="tableConfig"
    />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import AppTable from '@/components/AppTable'

export default defineComponent({
  name: 'TableDemo1',
  components: {
    AppTable
  },
  setup() {
    const tableConfig = reactive({
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
      tableSearchBtnName: {
        submit: '提交',
        reset: '重置'
      }
    })

    return {
      tableConfig
    }
  }
})
</script>

<style scoped>

</style>
