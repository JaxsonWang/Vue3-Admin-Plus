<!--
  - Copyright (c) 2021 Jaxson
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：index.vue
  - 创建日期：2021年04月14日
  - 创建作者：Jaxson
  -->

<template>
  <div
    class="navbar"
    :style="{
      height: height
    }"
  >
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" alt="avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> Home </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/JaxsonWang/Vue3-Admin-Plus">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span>登出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from './Hamburger.vue'

import { AppActionTypes } from '@/store/modules/app/actions'
import { UserActionTypes } from '@/store/modules/user/actions'

export default defineComponent({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger
  },
  props: {
    height: {
      type: String,
      default: '50px'
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    const sidebar = computed(() => store.getters.sidebar)
    const toggleSideBar = () => store.dispatch(AppActionTypes.toggleSidebar)
    const logout = async () => {
      await store.dispatch(UserActionTypes.logout)
      await router.push(`/login?redirect=${route.fullPath}`)
    }

    return {
      avatar,
      sidebar,
      toggleSideBar,
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';

.navbar {
  position: relative;
  overflow: hidden;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: color 280ms;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      color: $menuActiveText !important;
      fill: currentColor;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    // 导航栏工具菜单
    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 280ms;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    // 头像下拉菜单
    :deep(.avatar-container) {
      display: block;
      margin-right: 30px;
      height: 100%;

      .avatar-wrapper {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          vertical-align: middle;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 30px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
