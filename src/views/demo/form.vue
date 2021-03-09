<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：form.vue
  - 创建日期：2021/3/9 下午10:02
  - 创建作者：jaxson
  -->

<template>
  <div class="app-form-container">
    <app-form />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import AppForm from '@/components/AppForm'

export default defineComponent({
  name: 'FormDemo',
  components: {
    AppForm
  },
  setup() {}
})
</script>

<style scoped>

</style>
