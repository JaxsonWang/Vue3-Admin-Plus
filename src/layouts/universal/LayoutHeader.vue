<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：Header.vue
  - 创建日期：2021年09月03日
  - 创建作者：Jaxson
  -->

<template>
  <div class="header-wrapper flex justify-between items-center h-full">
    <div class="header-left-wrapper flex items-center h-full">
      <div :class="{'is-active': app.sidebarCollapse}" class="menu-fold" @click="app.toggleCollapse">
        <app-icon icon="el-expand" size="18px" />
      </div>
      <el-breadcrumb :separator-icon="ArrowRight" class="menu-breadcrumb">
        <template v-for="(item, index) in routes" :key="item.name">
          <el-breadcrumb-item v-if="index === (routes.length - 1)">{{ item?.meta.title || '菜单' }}</el-breadcrumb-item>
          <el-breadcrumb-item v-else :to="item">{{ item?.meta.title || '菜单' }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="header-right-wrapper">
      2
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons'
import AppIcon from '@/components/AppIcon'
import { useApp } from '@/store/modules/app'

const route = useRoute()
const app = useApp()

const routes = route.matched || []
console.log(routes)
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
.menu-breadcrumb {
  margin-left: 10px;
}
</style>
