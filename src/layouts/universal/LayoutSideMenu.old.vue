<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：LayoutSideMenu.old.vue
  - 创建日期：2021年09月08日
  - 创建作者：Jaxson
  -->

<template>
  <el-scrollbar :height="scrollbarHeight" wrap-class="side-menu-scrollbar">
    <el-menu :default-openeds="['1', '3']" class="border-none">
      <el-sub-menu index="1">
        <template #title><el-icon><message /></el-icon>导航一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-sub-menu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title><el-icon><menu /></el-icon>导航二</template>
        <el-menu-item index="2-1"><el-icon><menu /></el-icon>选项1</el-menu-item>
        <el-menu-item index="2-2"><el-icon><menu /></el-icon>选项2</el-menu-item>
        <el-menu-item index="2-3"><el-icon><menu /></el-icon>选项3</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title><el-icon><menu /></el-icon>选项4</template>
          <el-menu-item index="2-4-1"><el-icon><menu /></el-icon>选项4-1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title><el-icon><setting /></el-icon>导航三</template>
        <el-menu-item index="3-1"><el-icon><menu /></el-icon>选项1</el-menu-item>
        <el-menu-item index="3-2"><el-icon><menu /></el-icon>选项2</el-menu-item>
        <el-menu-item index="3-3"><el-icon><menu /></el-icon>选项3</el-menu-item>
        <el-sub-menu index="3-4">
          <template #title><el-icon><menu /></el-icon>选项4</template>
          <el-menu-item index="3-4-1"><el-icon><menu /></el-icon>选项4-1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title><el-icon><setting /></el-icon>导航四</template>
        <el-menu-item index="4-1"><el-icon><menu /></el-icon>选项1</el-menu-item>
        <el-menu-item index="4-2"><el-icon><menu /></el-icon>选项2</el-menu-item>
        <el-menu-item index="4-3"><el-icon><menu /></el-icon>选项3</el-menu-item>
        <el-sub-menu index="4-4">
          <template #title><el-icon><menu /></el-icon>选项4</template>
          <el-menu-item index="4-4-1"><el-icon><menu /></el-icon>选项4-1</el-menu-item>
          <el-menu-item index="4-4-2"><el-icon><menu /></el-icon>选项4-2</el-menu-item>
          <el-menu-item index="4-4-3"><el-icon><menu /></el-icon>选项4-3</el-menu-item>
          <el-menu-item index="4-4-4"><el-icon><menu /></el-icon>选项4-4</el-menu-item>
          <el-menu-item index="4-4-5"><el-icon><menu /></el-icon>选项4-5</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const scrollbarHeight = computed(() => '100vh')
</script>

<style lang="scss" scoped>

</style>
