<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：AppFooter.vue
  - 创建日期：2021/1/23 下午11:18
  - 创建作者：jaxson
  -->

<template>
  <el-footer class="footer-wrapper" height="50px">
    Vue3 Element Plus &copy; 2021 Created by 淮城一只猫
  </el-footer>
</template>

<script>
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
}
</style>
