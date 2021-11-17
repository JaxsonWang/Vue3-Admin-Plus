<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：LayoutMain.vue
  - 创建日期：2021年09月03日
  - 创建作者：Jaxson
  -->

<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="fade-transform">
      <keep-alive :max="20">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>

</style>
