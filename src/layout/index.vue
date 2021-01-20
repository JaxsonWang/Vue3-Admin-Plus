<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, watch, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import { Sidebar, Navbar, AppMain } from './components'

const { body } = document
const WIDTH = 992

export default defineComponent({
  name: 'App',
  components: {
    Sidebar,
    Navbar,
    AppMain
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
      if (store.getters.device === 'mobile' && store.getters.sidebar.opened) {
        store.dispatch('app/closeSideBar', {
          withoutAnimation: false
        })
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
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar{
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
