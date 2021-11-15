<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：Header.vue
  - 创建日期：2021年09月03日
  - 创建作者：Jaxson
  -->

<template>
  <div class="header-wrapper flex justify-between items-center h-full">
    <div class="header-left-wrapper">
      <div :class="{'is-active': app.sidebarCollapse}" class="menu-fold" @click="app.toggleCollapse">
        <app-icon icon="el-expand" size="18px" />
      </div>
    </div>
    <div class="header-right-wrapper">
      2
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppIcon from '@/components/AppIcon'
import { useApp } from '@/store/modules/app'

const app = useApp()
</script>

<style lang="scss" scoped>
.menu-fold {
  cursor: pointer;
  transition-duration: 500ms;
  transform: rotate(180deg);
  &.is-active {
    transform: rotate(0);
  }
}
</style>
