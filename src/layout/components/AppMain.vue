<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：AppMain.vue
  - 创建日期：2021年04月14日
  - 创建作者：Jaxson
  -->

<template>
  <el-main class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'AppMain',
  setup() {
    return {
      cachedViews: useStore().state.tagsView.cachedViews
    }
  }
})
</script>

<style lang="scss" scoped>
// navbar 置顶
.app-main.is-fixed-header {
  // navbar 50px + main padding-top 20px
  padding-top: calc(50px + 20px);
  // el-footer 50px
  min-height: calc(100vh - 50px);
}

// 有 tagsView
.app-main.is-show-tags-view {
  // navbar 50px + el-footer 50px + tags-view 40px
  min-height: calc(100vh - 50px - 50px - 40px);
}

// fixed-footer 悬浮
.app-main.is-fixed-footer {
  padding-bottom: 50px;
}

// navbar 置顶 + 有 tagsView
.app-main.is-fixed-header.is-show-tags-view {
  // navbar 50px + tags-view 40px + main padding-top 20px
  padding-top: calc(50px + 40px + 20px);
  // footer 50px
  min-height: calc(100vh - 50px);
}

// navbar 置顶 + footer 悬浮
.app-main.is-fixed-header.is-fixed-footer {
  // navbar 50px + main padding-top 20px
  padding-top: calc(50px + 20px);
  // footer 50px
  min-height: calc(100vh - 50px);
}

// navbar 置顶 + footer 悬浮 + 有 tagsView
.app-main.is-fixed-header.is-show-tags-view.is-fixed-footer {
  // navbar 50px + main padding-top 20px + tags-view 40px
  padding-top: calc(50px + 20px + 40px);
  // footer 50px
  min-height: calc(100vh - 50px);
}

.app-main {
  // el-footer 50px + el-footer 50px 必须存在
  min-height: calc(100vh - 50px - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f0f2f5;
}
</style>
