<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：AppMain.vue
  - 创建日期：2021/1/20 下午6:31
  - 创建作者：Jaxson
  -->

<template>
  <el-main class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-main>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppMain'
})
</script>

<style lang="scss" scoped>
// navbar 置顶
.fixed-header + .app-main {
  padding-top: 70px;
  // el-footer = 50px
  min-height: calc(100vh - 50px);
}

.app-main {
  // el-footer = 50px + el-footer = 50px
  min-height: calc(100vh - 50px - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
