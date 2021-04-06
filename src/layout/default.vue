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

<script>
import { defineComponent, computed, watch, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import { Sidebar, Navbar, AppMain, AppFooter, TagsView } from './components'

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
        store.dispatch('app/toggleDevice', isMobile() ? 'mobile' : 'desktop')

        if (isMobile()) {
          store.dispatch('app/closeSideBar', {
            withoutAnimation: true
          })
        }
      }
    }
    const handleClickOutside = () => {
      store.dispatch('app/closeSideBar', {
        withoutAnimation: false
      })
    }
    // 记录当前路由
    const setCurrentRoute = () => store.dispatch('router/setCurrentRoute', route)

    // 路由更新回调
    watch(
      () => route.path,
      () => {
        if (store.getters.device === 'mobile' && store.getters.sidebar.opened) {
          store.dispatch('app/closeSideBar', {
            withoutAnimation: false
          })
        }
        setCurrentRoute()
      }
    )

    onBeforeMount(() => {
      window.addEventListener('resize', resizeHandler)
      setCurrentRoute()
    })
    onMounted(() => {
      if (isMobile()) {
        store.dispatch('app/toggleDevice', 'mobile')
        store.dispatch('app/closeSideBar', {
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
