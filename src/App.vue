<template>
  <div class="app-provider">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>
<script lang="ts" setup>
import zhCN from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCN
</script>
