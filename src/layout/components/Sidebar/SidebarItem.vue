<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：SidebarItem.vue
  - 创建日期：2021年04月14日
  - 创建作者：Jaxson
  -->

<template>
  <div v-if="!item.meta.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{
            'submenu-title-no-dropdown': !isNest
          }"
        >
          <template v-if="onlyOneChild.meta.icon || (item.meta && item.meta.icon)">
            <template v-if="(onlyOneChild.meta.icon || (item.meta && item.meta.icon)).includes('el-icon')">
              <i :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" class="sub-el-icon" />
            </template>
            <template v-else>
              <svg-icon :icon-class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
            </template>
          </template>
          <template #title>{{ onlyOneChild.meta.title }}</template>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
      popper-class="body-popper-el-submenu"
    >
      <template #title>
        <template v-if="item.meta && item.meta.icon">
          <template v-if="(item.meta && item.meta.icon).includes('el-icon')">
            <i :class="item.meta && item.meta.icon" class="sub-el-icon" />
          </template>
          <template v-else>
            <svg-icon :icon-class="item.meta && item.meta.icon" />
          </template>
          <span v-if="item.meta.title">{{ item.meta.title }}</span>
        </template>
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
  </div>
</template>

<script lang="ts">
import path from 'path'
import { defineComponent, ref } from 'vue'
import AppLink from './Link.vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'SidebarItem',
  components: {
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
    const onlyOneChild = ref(null)
    const hasOneShowingChild = (children = [], parent: any) => {
      const showingChildren = children.filter((item: any) => {
        if (item.meta.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }

    const resolvePath = (routePath: any) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return path.resolve(props.basePath, routePath)
    }

    return {
      onlyOneChild,
      hasOneShowingChild,
      resolvePath
    }
  }
})
</script>
