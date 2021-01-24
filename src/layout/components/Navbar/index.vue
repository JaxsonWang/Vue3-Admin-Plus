<!--
  - Copyright (c) 2021
  - 项目名称：Vue3-Admin-Plus
  - 文件名称：Navbar.vue
  - 创建日期：2021/1/19 下午10:04
  - 创建作者：jaxson
  -->

<template>
  <div class="navbar" :style="{
    height: height
  }">
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
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span>Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'

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
    const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    const sidebar = computed(() => store.getters.sidebar)
    const toggleSideBar = () => store.dispatch('app/toggleSideBar')
    const logout = () => {
      store.dispatch('user/logout')
      useRouter().push(`/login?redirect=${this.$route.fullPath}`)
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
@import "~@/styles/variables.scss";

.navbar {
  position: relative;
  overflow: hidden;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: color 280ms;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      color: $menuActiveText!important;
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
    ::v-deep(.right-menu-item) {
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
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    // 头像下拉菜单
    ::v-deep(.avatar-container) {
      display: block;
      margin-right: 30px;
      height: 100%;

      .avatar-wrapper {
        position: relative;
        height: 100%;

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
