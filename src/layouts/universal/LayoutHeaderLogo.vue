<template>
  <div class="logo-container">
    <router-link to="/">
      <span class="logo">
        <!-- 使用自定义 svg logo -->
        <app-icon v-if="logo" :icon="logo" is-custom-svg />
      </span>
      <span class="title">{{ title }}</span>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import AppIcon from '@/components/AppIcon'
import { useApp } from '@/store/modules/app'

const { title, logo } = useApp()
</script>

<style lang="scss" scoped>
</style>
