<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：form.vue
  - 创建日期：2021/3/9 下午10:02
  - 创建作者：jaxson
  -->

<template>
  <div class="app-form-container">
    <app-form :config="formConfig" />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

import AppForm from '@/components/AppForm'

export default defineComponent({
  name: 'FormDemo',
  components: {
    AppForm
  },
  setup() {
    const formConfig = reactive({
      formAttr: {
        inline: false,
        labelPosition: 'top',
        labelWidth: 'auto',
        size: 'small'
      },
      formList: [
        {
          type: 'input',
          key: 'username',
          labelAttr: {
            label: '用户名'
          },
          formAttr: {
            type: 'text',
            value: 'Jaxson',
            placeholder: '请输入用户名',
            clearable: true
          }
        },
        {
          type: 'radio',
          key: 'radio',
          labelAttr: {
            label: '单选集合'
          },
          formAttr: {
            value: 1
          },
          options: [
            {
              title: '选项1',
              attr: {
                label: 0,
                disabled: true
              }
            },
            {
              title: '选项2',
              attr: {
                label: 1
              }
            },
            {
              title: '选项3',
              attr: {
                label: 2
              }
            }
          ]
        },
        {
          type: 'checkbox',
          key: 'checkbox',
          labelAttr: {
            label: '多选集合'
          },
          formAttr: {
            value: [0, 1]
          },
          options: [
            {
              title: '选项1',
              attr: {
                label: 0
              }
            },
            {
              title: '选项2',
              attr: {
                label: 1
              }
            },
            {
              title: '选项3',
              attr: {
                label: 2
              }
            }
          ]
        },
        {
          type: 'input-number',
          key: 'inputNumber',
          labelAttr: {
            label: '计数器'
          },
          formAttr: {
            value: 1,
            min: 1,
            max: 10,
            label: '描述说明'
          }
        },
        {
          type: 'select',
          key: 'select',
          labelAttr: {
            label: '选择器'
          },
          formAttr: {
            value: 0,
            placeholder: '请选择选项'
          },
          options: [
            {
              label: '选项1',
              value: 0
            },
            {
              label: '选项2',
              value: 1
            },
            {
              label: '选项3',
              value: 2
            }
          ]
        }
      ]
    })

    return {
      formConfig
    }
  }
})
</script>

<style scoped>

</style>
