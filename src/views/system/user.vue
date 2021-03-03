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
      tableColumn: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          label: '序号',
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          align: 'center',
          label: '登录账号',
          prop: 'username'
        },
        {
          align: 'center',
          label: '用户邮箱',
          prop: 'email'
        },
        {
          align: 'center',
          label: '用户昵称',
          prop: 'nickname'
        },
        {
          align: 'center',
          label: '创建时间',
          prop: 'createdTime',
          dateTimeFormat: 'YYYY-MM-DD HH:mm:ss'
        },
        {
          align: 'center',
          label: '更新时间',
          prop: 'updatedTime',
          dateTimeFormat: 'YYYY-MM-DD HH:mm:ss'
        },
        {
          width: 120,
          align: 'center',
          label: '操作',
          action: ['edit', 'delete']
        }
      ],
      tableListApi: params => request.get('/user', { params }),
      tableListParams: {},
      tableDeleteApi: userId => request.delete(`/user/${userId}`),
      tableDeleteParams: {},
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
