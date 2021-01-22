<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：AppMain.vue
  - 创建日期：2021/1/20 下午6:31
  - 创建作者：Jaxson
  -->

<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppMain'
})
</script>

<style lang="scss">
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>
