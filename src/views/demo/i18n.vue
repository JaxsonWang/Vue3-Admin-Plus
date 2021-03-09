<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：index.vue
  - 创建日期：2021/2/1 下午1:17
  - 创建作者：Jaxson
  -->

<template>
  <div class="i18n-demo-container">
    <el-button-group>
      <el-button type="primary" size="mini" @click="changeLanguage('en')">English</el-button>
      <el-button type="primary" size="mini" @click="changeLanguage('zh-cn')">中文</el-button>
    </el-button-group>
    <p>{{ t('message.hello') }}</p>
    <el-date-picker
      v-model="dateValue"
      type="datetimerange"
    />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'I18nDemo',
  setup() {
    const dateValue = reactive([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)])
    const { t, locale } = useI18n()
    const changeLanguage = type => {
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

<style scoped>

</style>
