<template>
  <div class="handle-login-wrapper m-auto lg:m-0">
    <div class="login-text enter-right mb-3 text-center lg:text-left">系统登录</div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="default" class="login-form" @keyup.enter="handleLogin">
      <el-form-item prop="username" class="enter-right">
        <el-input v-model="loginForm.username" placeholder="用户账号" prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item prop="password" class="enter-right">
        <el-input v-model="loginForm.password" :type="passwordType" placeholder="用户密码" prefix-icon="el-icon-lock">
          <template #append>
            <el-button :icon="passwordType === 'password' ? 'el-icon-unlock' : 'el-icon-lock'" @click="showPassword" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="verificationCodeInfo.captchaOnOff" prop="code" class="enter-right verification-code-form-item">
        <el-input v-model="loginForm.code" placeholder="验证码" prefix-icon="el-icon-mobile">
          <template #append>
            <el-image :src="verificationCodeInfo.img" fit="contain" class="verification-code-image" @click="getCaptchaImageAction" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="enter-right">
        <div class="remember-wrapper flow-root">
          <el-checkbox v-model="rememberPassword" class="float-left">记住我</el-checkbox>
          <el-button type="text" class="float-right" @click="emit('login-type', 'rest-account')">忘记密码？</el-button>
        </div>
      </el-form-item>
      <el-form-item class="enter-right">
        <el-button :loading="loading" type="primary" class="w-full" @click="handleLogin">登 录</el-button>
      </el-form-item>
      <el-form-item class="enter-right">
        <div class="login-type-list grid grid-cols-3 gap-4">
          <div class="col-span-1">
            <el-button class="w-full" @click="emit('login-type', 'phone')">手机号登录</el-button>
          </div>
          <div class="col-span-1">
            <el-button class="w-full" @click="emit('login-type', 'qrcode')">二维码登录</el-button>
          </div>
          <div class="col-span-1">
            <el-button class="w-full" @click="emit('login-type', 'signup')">注册</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item class="enter-right mb-0">
        <el-divider class="divider-wrapper">其它登录方式</el-divider>
      </el-form-item>
      <el-form-item class="enter-right">
        <div class="social-wrapper flex flex-row justify-around items-center">
          <app-icon icon="ri-github-fill" :size="28" class="social-item" />
          <app-icon icon="ri-alipay-fill" :size="28" class="social-item" />
          <app-icon icon="ri-qq-fill" :size="28" class="social-item" />
          <app-icon icon="ri-weibo-fill" :size="28" class="social-item" />
          <app-icon icon="ri-twitter-fill" :size="28" class="social-item" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon'

const emit = defineEmits(['login-type'])
const loginFormRef = ref()
const loginForm = ref({
  username: 'admin',
  password: 'admin123',
  code: ''
})
const loginRules = ref({
  username: [
    { required: true, trigger: 'blur', message: '请输入用户账号！' }
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入用户密码！' }
  ],
  code: [
    { required: true, trigger: 'blur', message: '请输入验证码！' }
  ]
})
const loading = ref(false)
const passwordType = ref('password')
const rememberPassword = false
const verificationCodeInfo = ref({
  captchaOnOff: false,
  img: null,
  uuid: null
})
const showPassword = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
const handleLogin = () => {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      const form = JSON.parse(JSON.stringify(loginForm))
      form.uuid = verificationCodeInfo.value.uuid
    }
  })
}
</script>

<style lang="scss" scoped>
@import "../style";

.login-form {
  .verification-code-form-item {
    .verification-code-image {
      width: 100px;
      height: 100%;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
      border-right: 1px solid #fff;
    }
    :deep(.el-input-group__append) {
      padding: 0;
      border: none;
    }
  }
  .divider-wrapper {
    :deep(.el-divider__text) {
      color: #888;
      background-color: transparent;
    }
  }
  .social-wrapper {
    .social-item {
      color: #888;
      cursor: pointer;
      transition: color 250ms linear;
      &:hover {
        // color: $main-base-color;
      }
    }
  }
}
</style>
