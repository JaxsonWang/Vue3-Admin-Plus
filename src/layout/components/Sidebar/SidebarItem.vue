<template>
  <div v-if="!item.hidden">
    <template v-if="item.children && Array.isArray(item.children) && hasChildRoute(item.children)">
      <el-submenu ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
        <template #title>
          <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
        </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </el-submenu>
    </template>
    <template v-else>
      <app-link :to="item.path">
        <el-menu-item :index="resolvePath(item.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="item.meta.icon || (item.meta && item.meta.icon)" :title="item.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>

<script>
import path from 'path'
import { defineComponent } from 'vue'
import Item from './Item'
import AppLink from './Link'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'SidebarItem',
  components: {
    Item,
    AppLink
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: '/'
    }
  },
  setup(props) {
    const hasChildRoute = (children = []) => {
      const showChildren = children.filter(item => {
        return !item.hidden
      })
      return showChildren.length > 0
    }

    const resolvePath = routePath => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return path.resolve(props.basePath, routePath)
    }

    return {
      hasChildRoute,
      resolvePath
    }
  }
})
</script>
