<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：user.vue
  - 创建日期：2021/3/2 下午8:34
  - 创建作者：jaxson
  -->

<template>
  <div class="system-user-container">
    <app-table :config="tableConfig" ref="appTableRef">
<!--      <template #header-action="{ loading }">-->
<!--        <el-button-->
<!--          :loading="loading"-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="small"-->
<!--          @click="handleAdd"-->
<!--        >-->
<!--          新增-->
<!--        </el-button>-->
<!--        <el-button-->
<!--          :loading="loading"-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="small"-->
<!--          @click="handleDelete"-->
<!--        >-->
<!--          删除-->
<!--        </el-button>-->
<!--      </template>-->
      <template #is-active>
        <el-table-column
          :width="100"
          label="用户状态"
          align="center"
        >
          <template v-slot="scope">
            <el-tag v-if="scope.row.isActive" type="success">正常</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
      </template>
    </app-table>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import AppTable from '@/components/AppTable'
import { request } from '@/utils/request'

export default defineComponent({
  name: 'SystemUser',
  components: {
    AppTable
  },
  setup() {
    const tableConfig = reactive({
      headerActions: [
        {
          action: 'delete',
          title: '删除',
          attrs: {
            type: 'danger',
            size: 'small',
            icon: 'el-icon-delete'
          },
          api: row => request.delete('/user/list', {
            data: {
              list: row.map(i => i.id)
            }
          })
        },
        {
          action: 'add',
          title: '新建',
          attrs: {
            type: 'primary',
            size: 'small',
            icon: 'el-icon-plus'
          },
          type: 'editBox'
        }
      ],
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
          slot: 'is-active'
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
          action: ['editBox', 'editRoute', 'delete']
        }
      ],
      tableListApi: params => request.get('/user', { params }),
      tableListParams: {},
      tableDeleteApi: userId => request.delete(`/user/${userId}`),
      tableDeleteParams: {},
      tableEditApi: userId => request.post(`/user/${userId}`),
      tableSearch: {
        formAttrs: {
          inline: true,
          size: 'small'
        },
        formList: [
          {
            type: 'input',
            key: 'username',
            value: '',
            labelAttrs: {
              label: '登录账号'
            },
            formAttrs: {
              type: 'text',
              placeholder: '请输入登录账号',
              clearable: true
            }
          },
          {
            type: 'select',
            key: 'activeStatus',
            value: 3,
            labelAttrs: {
              label: '用户状态'
            },
            formAttrs: {
              placeholder: '请选择用户状态'
            },
            options: [
              {
                label: '正常',
                value: 1
              },
              {
                label: '禁用',
                value: 0
              },
              {
                label: '全部',
                value: 3
              }
            ]
          },
          {
            type: 'submit',
            submit: {
              title: '搜索',
              attrs: {
                type: 'primary'
              }
            },
            reset: {
              title: '重置'
            }
          }
        ]
      },
      editBox: {
        api: {
          add: () => request.post('/user'),
          update: () => request.put('/user')
        },
        title: '用户',
        dialog: {
          width: '960px',
          appendToBody: true,
          destroyOnClose: true
        },
        form: {
          formAttrs: {
            inline: true,
            size: 'small'
          },
          formList: [
            {
              type: 'input',
              key: 'nickname',
              value: '',
              labelAttrs: {
                label: '用户昵称'
              },
              formAttrs: {
                type: 'text',
                placeholder: '请输入用户昵称',
                clearable: true
              }
            }
          ]
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
    })
    const appTableRef = ref(null)

    // todo 国际化优化显示
    useI18n().locale.value = 'zh-cn'

    return {
      tableConfig,
      appTableRef
    }
  }
})
</script>

<style lang="scss" scoped>
.system-user-container {
  height: 100%;
}
</style>
