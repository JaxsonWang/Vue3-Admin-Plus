<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：user.vue
  - 创建日期：2021/3/2 下午8:34
  - 创建作者：jaxson
  -->

<template>
  <div class="system-user-container">
    <app-table :config="tableConfig" />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

import AppTable from '@/components/AppTable'
import { request } from '@/utils/request'

export default defineComponent({
  name: 'SystemUser',
  components: {
    AppTable
  },
  setup() {
    const tableConfig = reactive({
      tableColumn: [],
      tableListApi: params => request.get('/user', params),
      tableListParams: {}, // tableListApi 所需要的参数
      tableDelApi: null,
      tableSearch: []
    })

    return {
      tableConfig
    }
  }
})
</script>

<style lang="scss" scoped>
.system-user-container {
  height: 100%;
}
</style>
