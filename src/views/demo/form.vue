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
