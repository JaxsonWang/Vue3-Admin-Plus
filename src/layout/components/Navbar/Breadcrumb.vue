<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：Breadcrumb.vue
  - 创建日期：2021年04月14日
  - 创建作者：Jaxson
  -->

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in getBreadcrumb()" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === getBreadcrumb().length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as pathToRegexp from 'path-to-regexp'

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isDashboard = (route: any) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }
    const getBreadcrumb = () => {
      // only show routes with meta.title
      const matched: any = route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!isDashboard(first)) {
        matched.unshift({
          path: '/dashboard',
          meta: {
            title: 'Dashboard'
          }
        })
      }

      return matched.filter((item: any) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
    const pathCompile = (path: any) => {
      const { params } = route
      const toPath = pathToRegexp.compile(path)
      return toPath(params)
    }
    const handleLink = (item: any) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(pathCompile(path))
    }

    return {
      handleLink,
      getBreadcrumb
    }
  }
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
