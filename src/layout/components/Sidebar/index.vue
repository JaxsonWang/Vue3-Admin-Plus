<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <template v-for="item in routes" :key="item.path">
          <sidebar-item :item="item" :base-path="item.path" />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
    const sidebar = computed(() => store.state.app.sidebar)
    const routes = computed(() => useRouter().options.routes)
    const activeMenu = computed(() => {
      const route = useRoute()
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    const showLogo = computed(() => store.state.settings.sidebarLogo)
    const variables = computed(() => variable)
    const isCollapse = computed(() => sidebar.value.opened)

    return {
      routes,
      activeMenu,
      showLogo,
      variables,
      isCollapse
    }
  }
})
</script>
