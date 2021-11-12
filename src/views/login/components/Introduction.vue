<template>
  <div class="introduction-wrapper lg:col-span-2 relative hidden lg:flex items-center">
    <div class="lg-logo-wrapper enter-left absolute top-0 left-0 flex items-center">
      <img src="@/assets/login_images/logo.svg" class="logo-image" alt="logo" />
      <span class="logo-title">{{ getTitle }}</span>
    </div>
    <div class="introduce-wrapper">
      <img src="@/assets/login_images/login-box-bg.svg" class="login-box enter-left" alt="box" />
      <div class="desc-text enter-left mt-5">开箱即用的中后台管理系统</div>
      <div class="info-text enter-left mt-3">输入您的个人详细信息开始使用！</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useApp } from '@/store/modules/app'
const getTitle = useApp().title
</script>

<style lang="scss" scoped>
@import "../style";

.introduction-wrapper {
  .lg-logo-wrapper {
    height: 60px;

    .logo-title {
      overflow: hidden;
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: all 0.5s;
    }

    .logo-image {
      width: 48px;
    }
  }
  .introduce-wrapper {
    color: #fff;

    .login-box {
      width: 60%;
    }

    .desc-text {
      font-size: 28px;
      font-weight: 700;
    }

    .info-text {
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>
