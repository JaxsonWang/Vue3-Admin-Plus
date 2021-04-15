<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：default.vue
  - 创建日期：2021年04月14日
  - 创建作者：Jaxson
  -->

<template>
  <el-container :class="appWrapper" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <el-container class="main-container">
      <el-header :class="navbarWrapper" :height="showTagsView ? '90px' : '50px'" class="navbar-wrapper">
        <navbar :height="showTagsView ? '50px' : '100%'" />
        <tags-view v-if="showTagsView" />
      </el-header>
      <app-main :class="mainWrapper" />
      <app-footer :class="footerWrapper" />
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { Sidebar, Navbar, AppMain, AppFooter, TagsView } from './components'

import { MutationType as AppMutationType } from '@/store/modules/app/mutations'

const { body } = document
const WIDTH = 992

export default defineComponent({
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    AppMain,
    AppFooter,
    TagsView
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const sidebar = computed(() => store.state.app.sidebar)
    const device = computed(() => store.state.app.device)
    const showTagsView = computed(() => store.state.settings.tagsView)
    const navbarWrapper = computed(() => {
      return {
        'fixed-header': store.state.settings.fixedHeader,
        'show-tags-view': showTagsView.value
      }
    })
    const mainWrapper = computed(() => {
      return {
        'is-fixed-header': store.state.settings.fixedHeader,
        'is-show-tags-view': showTagsView.value,
        'is-fixed-footer': store.state.settings.fixedFooter
      }
    })
    const footerWrapper = computed(() => {
      return {
        'fixed-footer': store.state.settings.fixedFooter
      }
    })
    const appWrapper = computed(() => {
      return {
        'hide-sidebar': !sidebar.value.opened,
        'open-sidebar': sidebar.value.opened,
        'without-animation': sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile'
      }
    })

    const isMobile = () => {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }
    const resizeHandler = () => {
      if (!document.hidden) {
        store.commit(AppMutationType.toggleDevice, isMobile() ? 'mobile' : 'desktop')

        if (isMobile()) {
          store.commit(AppMutationType.closeSidebar, {
            withoutAnimation: true
          })
        }
      }
    }
    const handleClickOutside = () => {
      store.commit(AppMutationType.closeSidebar, {
        withoutAnimation: false
      })
    }

    // 路由更新回调
    watch(
      () => route.path,
      () => {
        if (store.getters.device === 'mobile' && store.getters.sidebar.opened) {
          store.commit(AppMutationType.closeSidebar, {
            withoutAnimation: false
          })
        }
      }
    )

    onBeforeMount(() => {
      window.addEventListener('resize', resizeHandler)
    })
    onMounted(() => {
      if (isMobile()) {
        store.commit(AppMutationType.toggleDevice, 'mobile')
        store.commit(AppMutationType.closeSidebar, {
          withoutAnimation: true
        })
      }
    })
    onBeforeUnmount(() => {
      window.addEventListener('resize', resizeHandler)
    })

    return {
      sidebar,
      device,
      navbarWrapper,
      mainWrapper,
      footerWrapper,
      appWrapper,
      showTagsView,
      handleClickOutside
    }
  }
})
</script>
