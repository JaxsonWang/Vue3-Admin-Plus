<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
  </div>
</template>

<script>
import { defineComponent, computed, watch, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import { Sidebar } from './components'

const { body } = document
const WIDTH = 992

export default defineComponent({
  name: 'App',
  components: {
    Sidebar
  },
  setup() {
    const sidebar = computed(() => store.state.app.sidebar)
    const device = computed(() => store.state.app.device)
    const fixedHeader = computed(() => store.state.settings.fixedHeader)
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile'
      }
    })
    watch(useRoute(), route => {
      if (store.app.device === 'mobile' && store.app.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
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
    onBeforeMount(() => {
      window.addEventListener('resize', resizeHandler)
    })
    onMounted(() => {
      if (isMobile()) {
        store.dispatch('app/toggleDevice', 'mobile')
        store.dispatch('app/closeSideBar', { withoutAnimation: true })
      }
    })
    onBeforeUnmount(() => {
      window.addEventListener('resize', resizeHandler)
    })

    return {
      sidebar,
      device,
      fixedHeader,
      classObj,
      handleClickOutside
    }
  }
})
</script>
