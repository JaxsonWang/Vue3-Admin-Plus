<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：AppFooter.vue
  - 创建日期：2021年04月14日
  - 创建作者：Jaxson
  -->

<template>
  <el-footer class="footer-wrapper" height="50px"> Vue3 Admin Plus &copy; 2021 Created by 淮城一只猫 </el-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppFooter'
})
</script>

<style lang="scss" scoped>
.footer-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #999;
  background-color: #f0f2f5;
}
</style>
