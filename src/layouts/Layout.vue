<template>
  <div class="app-wrapper">
    <component :is="layoutType" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount } from 'vue'
import { debounce } from 'lodash'
import { useApp } from '@/store/modules/app'
import { DeviceEnum } from '@/enums/app.enum'
import { DefaultLayout } from './index'

const WIDTH = 992
const layoutType = DefaultLayout
const { setDevice } = useApp()

/**
 * 判断手机响应式
 */
const isMobile = (): boolean => {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}

/**
 * 监听窗口变化回调
 */
const resizeHandler = (): void => {
  if (!document.hidden) setDevice(isMobile() ? DeviceEnum.MOBILE : DeviceEnum.DESKTOP)
}

onBeforeMount(() => {
  window.addEventListener('resize', debounce(resizeHandler, 250))
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style lang="scss" scoped>
</style>
