<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：DefaultLayout.vue
  - 创建日期：2021年09月03日
  - 创建作者：Jaxson
  -->

<template>
  <el-container class="default-layout layout-wrapper">
    <el-aside width="300px" class="sidebar-wrapper">
      <LayoutSideMenu />
    </el-aside>
    <el-container class="content-wrapper">
      <el-header height="60px" class="header-wrapper">
        <LayoutHeader />
      </el-header>
      <el-main class="main-wrapper">
        <LayoutMain />
      </el-main>
      <el-footer height="60px" class="footer-wrapper">
        <LayoutFooter />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { LayoutSideMenu, LayoutHeader, LayoutMain, LayoutFooter } from './universal'
import './styles/default-layout.scss'
</script>

<style lang="scss" scoped>
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 250ms ease-in-out;
}

.fade-transform-enter {
  opacity: 0;
}

.fade-transform-leave-to {
  opacity: 0;
}
</style>
