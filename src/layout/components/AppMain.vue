<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：AppMain.vue
  - 创建日期：2021/1/20 下午6:31
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

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

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
.fixed-header + .app-main {
  // el-header 50px + main padding-top 20px
  padding-top: calc(50px + 20px);
  // el-footer = 50px
  min-height: calc(100vh - 50px);
}

// navbar 置顶 + 有 tagsView
.fixed-header.show-tags-view + .app-main {
  // el-header 50px + main padding-top 20px + tags-view = 40px
  padding-top: calc(50px + 20px + 40px);
  // el-footer = 50px
  min-height: calc(100vh - 50px);
}

// 有 tagsView
.show-tags-view + .app-main {
  // el-footer 50px + el-footer 50px + tags-view 40px
  min-height: calc(100vh - 50px - 50px - 40px);
}

.app-main {
  // el-footer 50px + el-footer 50px 必须存在
  min-height: calc(100vh - 50px - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
