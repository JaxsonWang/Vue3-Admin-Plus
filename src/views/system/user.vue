<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：user.vue
  - 创建日期：2021年04月14日
  - 创建作者：Jaxson
  -->

<template>
  <div class="system-user-container">
    <app-table :config="tableConfig" ref="appTableRef">
      <template #is-active>
        <el-table-column :width="100" label="用户状态" align="center">
          <template v-slot:header="{ column }">
            {{ column.label }}
          </template>
          <template v-slot="{ row }">
            <el-tag v-if="row.isActive" type="success">正常</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
      </template>
      <template #action-after="{ row }">
        <el-button v-if="row.isActive" type="text" size="small" @click="setActiveAction(row, false)">停用</el-button>
        <el-button v-else type="text" size="small" @click="setActiveAction(row, true)">启用</el-button>
      </template>
    </app-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

import AppTable from '@/components/AppTable'
import { request } from '@/utils/request'

export default defineComponent({
  name: 'SystemUser',
  components: {
    AppTable
  },
  setup() {
    const appTableRef = ref<any>(null)
    const tableConfig = reactive({
      header: {
        search: {
          formAttrs: {
            inline: true,
            size: 'small'
          },
          formList: [
            {
              type: 'input',
              key: 'username',
              labelAttrs: {
                label: '用户账号'
              },
              formAttrs: {
                type: 'text',
                placeholder: '请输入用户账号',
                clearable: true
              }
            },
            {
              type: 'select',
              key: 'isActive',
              labelAttrs: {
                label: '用户状态'
              },
              formAttrs: {
                placeholder: '请选择用户状态'
              },
              options: [
                {
                  label: '正常',
                  value: true
                },
                {
                  label: '禁用',
                  value: false
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
        actions: [
          {
            action: 'delete',
            title: '删除',
            attrs: {
              type: 'danger',
              size: 'small',
              icon: 'el-icon-delete'
            },
            api: (row: any) =>
              request.delete('/user/list', {
                data: {
                  list: row.map((i: any) => i.id)
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
        ]
      },
      table: {
        attrs: {
          stripe: true,
          border: true,
          fit: true,
          highlightCurrentRow: true
        },
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            type: 'index',
            label: '序号',
            width: 50,
            align: 'center'
          },
          {
            align: 'center',
            label: '用户账号',
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
            action: ['editBox', 'delete']
          }
        ],
        api: {
          list: (params: any) => request.get('/user', { params }),
          delete: (row: any) => request.delete(`/user/${row.id}`)
        }
      },
      editBox: {
        api: {
          add: (data: any) => request.post('/user', data),
          update: (data: any) => request.put(`/user/${data.id}`, data)
        },
        title: '用户',
        dialogAttrs: {
          width: '960px',
          appendToBody: true,
          destroyOnClose: true
        },
        dialogEvents: {
          open: () => {
            // 新建和弹窗部分表单区分是否可编辑
            appTableRef.value.appConfig.editBox.form.formList[0].formAttrs.disabled =
              appTableRef.value.editBox.type !== 'add'
          }
        },
        form: {
          formAttrs: {
            size: 'small',
            labelPosition: 'left',
            labelWidth: '80px'
          },
          formList: [
            {
              type: 'input',
              key: 'username',
              value: '',
              labelAttrs: {
                label: '用户账号',
                rules: [{ required: true, message: '请输入用户账号', trigger: 'blur' }]
              },
              formAttrs: {
                type: 'text',
                placeholder: '请输入用户账号',
                clearable: true,
                disabled: false
              }
            },
            {
              type: 'input',
              key: 'email',
              value: '',
              labelAttrs: {
                label: '用户邮箱',
                rules: [
                  { required: true, message: '请输入用户邮箱', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的用户邮箱地址', trigger: ['blur', 'change'] }
                ]
              },
              formAttrs: {
                type: 'text',
                placeholder: '请输入用户邮箱',
                clearable: true
              }
            },
            {
              type: 'input',
              key: 'nickname',
              value: '',
              labelAttrs: {
                label: '用户昵称',
                rules: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }]
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

    /**
     * 设置用户状态
     * @param row
     * @param status
     */
    const setActiveAction = (row: any, status: boolean) => {
      request
        .patch(`/user/${row.id}`, {
          isActive: status
        })
        .then(() => {
          appTableRef.value.getTableList()
          ElMessage.success('操作成功！')
        })
    }

    // todo 国际化优化显示
    useI18n().locale.value = 'zh-cn'

    return {
      tableConfig,
      appTableRef,
      setActiveAction
    }
  }
})
</script>

<style lang="scss" scoped>
.system-user-container {
  height: 100%;
}
</style>
