<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：i18n.vue
  - 创建日期：2021年04月14日
  - 创建作者：Jaxson
  -->

<template>
  <div class="i18n-demo-container">
    <el-button-group>
      <el-button type="primary" size="mini" @click="changeLanguage('en')">English</el-button>
      <el-button type="primary" size="mini" @click="changeLanguage('zh-cn')">中文</el-button>
    </el-button-group>
    <p>{{ t('message.hello') }}</p>
    <el-date-picker v-model="dateValue" type="datetimerange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'I18nDemo',
  setup() {
    const dateValue = reactive([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)])
    const { t, locale } = useI18n()
    const changeLanguage = (type: string) => {
      locale.value = type
    }

    changeLanguage('zh-cn')

    return {
      t,
      changeLanguage,
      dateValue
    }
  }
})
</script>

<style scoped></style>
