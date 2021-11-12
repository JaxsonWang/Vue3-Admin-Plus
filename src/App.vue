<template>
  <div :style="globalStyles" class="app-provider">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>
<script lang="ts" setup>
import { useApp } from '@/store/modules/app'
import zhCN from 'element-plus/lib/locale/lang/zh-cn'

const { theme } = useApp()
const locale = zhCN

const globalStyles = {
  '--menu-background-color': theme.menuBackgroundColor,
  '--sub-menu-background-color': theme.subMenuBackgroundColor,
  '--menu-text-color': theme.menuTextColor,
  '--menu-active-text-color': theme.menuActiveTextColor
}
</script>
