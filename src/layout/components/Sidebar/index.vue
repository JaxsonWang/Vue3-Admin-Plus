<template>
  <el-aside :width="sideBarWidth" :class="{'has-logo': showLogo}">
    <logo v-if="showLogo" :collapse="!isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" class="aside-scrollbar">
      <el-menu
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        menu-trigger="click"
        mode="vertical"
      >
        <template v-for="item in routes" :key="item.path">
          <sidebar-item :item="item" :base-path="item.path" />
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variable from '@/styles/variables.scss'

export default defineComponent({
  name: 'Sidebar',
  components: {
    Logo,
    SidebarItem
  },
  setup() {
    const route = useRoute()
    const sidebar = computed(() => store.state.app.sidebar)
    // const routes = computed(() => useRouter().options.routes)
    const routes = computed(() => store.state.user.routes)
    const showLogo = computed(() => store.state.settings.sidebarLogo)
    const variables = computed(() => variable)
    const isCollapse = computed(() => sidebar.value.opened)
    const sideBarWidth = computed(() => isCollapse.value ? variables.value.sideBarWidth : variables.value.hideSideBarWidth)

    const activeMenu = computed(() => {
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })

    return {
      routes,
      activeMenu,
      showLogo,
      variables,
      isCollapse,
      sideBarWidth
    }
  }
})
</script>
