<template>
  <div class="app-wrapper">
    <component :is="layoutType" />
  </div>
</template>

<script lang="ts" setup>
import { DefaultLayout } from './index'

const layoutType = DefaultLayout
</script>

<style lang="scss" scoped>
</style>
